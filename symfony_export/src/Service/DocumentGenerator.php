<?php

namespace App\Service;

use App\Model\OutputResult;
use App\Model\TemplateConfig;

class DocumentGenerator
{
    public function __construct(
        private ChannelFactory $channelFactory,
        private DataProviderFactory $dataProviderFactory,
        // private TemplateRepository $repository, 
    ) {}

    /**
     * @param string $templateId ID of the template definition
     * @param string $entityId ID of the actual record (Invoice ID)
     * @param string $format 'pdf', 'email', etc.
     */
    public function generate(string $templateId, string $entityId, string $format = 'pdf'): OutputResult
    {
        // 1. Fetch Template JSON + Metadata from DB
        // $templateEntity = $this->repository->find($templateId);
        // $craftJson = $templateEntity->getJson();
        // $reportType = $templateEntity->getReportType(); // e.g. 'invoice'
        
        // Mocking Metadata:
        $craftJson = []; 
        $reportType = 'invoice';
        
        // **NEW**: Load Physical Page Config from DB
        $templateConfig = new TemplateConfig(
            paperType: 'A4',       // $templateEntity->getPaperType()
            orientation: 'Portrait', // $templateEntity->getOrientation()
            margins: ['top'=>0, 'right'=>0, 'bottom'=>0, 'left'=>0] // $templateEntity->getMargins()
        );

        // 2. Load Data Strategy
        $provider = $this->dataProviderFactory->getProvider($reportType);
        $data = $provider->getData($entityId);

        // 3. Select Channel Strategy
        $channel = $this->channelFactory->create($format);

        // 4. Execute Generation with Config
        return $channel->generate($craftJson, $data, $templateConfig);
    }
}
