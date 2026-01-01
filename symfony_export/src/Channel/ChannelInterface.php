<?php

namespace App\Channel;

use App\Model\OutputResult;
use App\Model\TemplateConfig;

interface ChannelInterface
{
    /**
     * Generates the document in the specific format of the channel.
     *
     * @param array $json The complete Craft.js JSON tree
     * @param array $data The dynamic data (invoice, user, etc.)
     * @param TemplateConfig $config The Page/Paper configuration (A4, Landscape, etc.)
     * @return OutputResult
     */
    public function generate(array $json, array $data, TemplateConfig $config): OutputResult;

    public function getName(): string;
}
