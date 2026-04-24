import { X, Calendar, User, MapPin, Building2, FileText, ShieldCheck, Clock, ExternalLink, Bookmark, Share2 } from "lucide-react";

const Row = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 py-3 gap-1">
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide sm:w-48 shrink-0">{label}</span>
    <span className="text-sm text-gray-800 font-medium">{value || "—"}</span>
  </div>
);

const JobDetailModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-5 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition"
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl border border-white/30">
              {job.icon || <Building2 size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">{job.title}</h2>
              <p className="text-blue-200 text-sm mt-1">{job.org}</p>
              <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-bold ${job.statusStyle || "bg-green-400/30 text-green-100"}`}>
                {job.status}
              </span>
            </div>
          </div>
        </div>
 
        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 px-5 py-3 flex gap-2 items-start">
          <ShieldCheck size={16} className="text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-xs text-yellow-800 font-medium">
            Candidates are advised to read the official notification carefully before applying. Keep all documents ready before filling the form.
          </p>
        </div>

        {/* Details */}
        <div className="px-6 py-4">
          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-2">Vacancy Details</h3>

          <Row label="Post Name" value={job.title} />
          <Row label="Organization" value={job.org} />
          <Row label="Advertisement No." value={job.advNo || "To be notified"} />
          <Row label="Total Vacancies" value={job.vacancies || "As per official notification"} />
          <Row label="Post Category" value={job.category || "Group B / Group C"} />

          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mt-5 mb-2">Eligibility Criteria</h3>

          <Row label="Educational Qualification" value={job.qualification || "Graduate / Post Graduate from recognized university"} />
          <Row label="Age Limit" value={job.age} />
          <Row label="Age Relaxation" value={job.ageRelaxation || "As per Govt. rules (SC/ST/OBC/PwD)"} />
          <Row label="Nationality" value="Indian Citizen" />

          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mt-5 mb-2">Pay & Location</h3>

          <Row label="Pay Level / Scale" value={job.pay || "As per 7th Pay Commission"} />
          <Row label="Job Location" value={job.location || "All India"} />
          <Row label="Job Type" value="Permanent / Government" />

          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mt-5 mb-2">Important Dates</h3>

          <Row label="Notification Date" value={job.notificationDate || "Already Released"} />
          <Row label="Application Start" value={job.startDate || "Active"} />
          <Row label="Last Date to Apply" value={job.date} />
          <Row label="Exam Date" value={job.examDate || "To be announced"} />
          <Row label="Admit Card" value={job.admitCard || "Before exam date"} />

          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mt-5 mb-2">Application Fee</h3>

          <Row label="General / OBC / EWS" value={job.feeGeneral || "₹100"} />
          <Row label="SC / ST / PwD / Female" value={job.feeConcession || "Nil (Exempted)"} />
          <Row label="Payment Mode" value="Online (Net Banking / UPI / Debit Card)" />

          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mt-5 mb-2">Selection Process</h3>

          <Row label="Stage 1" value="Written Examination (CBT)" />
          <Row label="Stage 2" value={job.stage2 || "Skill Test / Document Verification"} />
          <Row label="Stage 3" value="Medical Examination (if applicable)" />

          {job.note && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex gap-2">
              <FileText size={14} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700">{job.note}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 rounded-b-2xl">
          <button className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2">
            <ExternalLink size={16} />
            Apply Now
          </button>
          <button className="px-4 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition">
            <Bookmark size={16} />
          </button>
          <button className="px-4 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
