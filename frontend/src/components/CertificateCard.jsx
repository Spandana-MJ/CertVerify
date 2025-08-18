

import CertificateCard from "./CertificateCard";

export default function CertificateGrid({ certificates }) {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        🚫 No certificates available.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <CertificateCard key={cert.id} cert={cert} />
      ))}
    </div>
  );
}
