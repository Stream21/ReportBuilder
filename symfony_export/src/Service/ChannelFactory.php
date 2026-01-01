<?php

namespace App\Service;

use App\Channel\ChannelInterface;

class ChannelFactory
{
    /** @var ChannelInterface[] */
    private iterable $channels;

    public function __construct(iterable $channels)
    {
        $this->channels = $channels;
    }

    public function create(string $format): ChannelInterface
    {
        foreach ($this->channels as $channel) {
            if ($channel->getName() === $format) {
                return $channel;
            }
        }

        throw new \InvalidArgumentException("Channel not supported: $format");
    }
}
