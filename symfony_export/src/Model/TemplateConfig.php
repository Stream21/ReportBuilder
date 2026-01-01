<?php

namespace App\Model;

class TemplateConfig
{
    public function __construct(
        public string $paperType = 'A4',       // 'A4', 'Letter', 'A5', 'Continuous'
        public string $orientation = 'Portrait', // 'Portrait', 'Landscape'
        public array $margins = [              // Margins in mm
            'top' => 0, 
            'right' => 0, 
            'bottom' => 0, 
            'left' => 0
        ],
        public ?float $paperWidth = null,      // Custom width (mm) for 'Continuous' type
        public ?float $paperHeight = null      // Custom height (mm)
    ) {}
}
