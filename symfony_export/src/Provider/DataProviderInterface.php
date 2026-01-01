<?php

namespace App\Provider;

interface DataProviderInterface
{
    /**
     * Loads the specific data for the document based on the entity ID.
     * 
     * @param string $entityId The ID of the record (Invoice ID, Payroll ID, etc.)
     * @return array The associative array of data to be used in Twig
     */
    public function getData(string $entityId): array;

    /**
     * @param string $reportType The type of report (e.g. 'invoice', 'payroll')
     * @return bool
     */
    public function supports(string $reportType): bool;
}
