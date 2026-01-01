<?php

namespace App\Model;

class OutputResult
{
    public function __construct(
        private string $content, // Binary content or success message
        private string $mimeType,
        private string $filename
    ) {}

    public function getContent(): string
    {
        return $this->content;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function getFilename(): string
    {
        return $this->filename;
    }
}
