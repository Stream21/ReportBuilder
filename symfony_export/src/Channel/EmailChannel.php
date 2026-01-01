<?php

namespace App\Channel;

use App\Service\ContentBuilder;
use App\Model\OutputResult;
use App\Model\TemplateConfig;
use Symfony\Component\Mailer\MailerInterface;

class EmailChannel implements ChannelInterface
{
    public function __construct(
        private ContentBuilder $builder,
        private MailerInterface $mailer
    ) {}

    public function generate(array $json, array $data, TemplateConfig $config): OutputResult
    {
        $html = $this->builder->buildHtml($json, $json['nodes'], $data);

        // ... Send Email ...

        return new OutputResult(
            "Email queued",
            'text/plain',
            'status.txt'
        );
    }

    public function getName(): string
    {
        return 'email';
    }
}
