import { ModelMetadata } from "../../generated/prisma";

type MetadataDeployement = ModelMetadata["deployment"];

type MetadataLicense = ModelMetadata["license"];

type MetadataPublicationYear = ModelMetadata["publicationYear"];

interface DeploymentInfoSectionProps {
  deployment: MetadataDeployement;
  license: MetadataLicense;
  publicationYear: MetadataPublicationYear;
}

export function DeploymentInfoSection({
  deployment,
  license,
  publicationYear,
}: DeploymentInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {deployment && (
        <div>
          <h2 className="text-plum mb-2 text-lg font-semibold">Deployment</h2>
          <p className="text-sm text-gray-600 md:text-base">{deployment}</p>
        </div>
      )}
      {license && (
        <div>
          <h2 className="text-plum mb-2 text-lg font-semibold">License</h2>
          <p className="text-sm text-gray-600 md:text-base">{license}</p>
        </div>
      )}

      {publicationYear && (
        <div>
          <h2 className="text-plum mb-2 text-lg font-semibold">
            Publication Year
          </h2>
          <p className="text-sm text-gray-600 md:text-base">
            {publicationYear}
          </p>
        </div>
      )}
    </div>
  );
}
