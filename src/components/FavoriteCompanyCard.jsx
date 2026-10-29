import { RecordLogo } from "../ui";

/* 관심 회사 한 줄 */
export default function FavoriteCompanyCard({ company, index, onStart, onEdit }) {
  return (
    <li className="fav">
      <RecordLogo company={company.company} job={company.job} idx={index} />
      <div className="fav-main">
        <span className="row-title">{company.company}</span>
        <span className="row-sub">{[company.job, company.sub].filter(Boolean).join(" · ") || "직무 미정"}</span>
      </div>
      <div className="fav-acts">
        <button type="button" className="btn btn-secondary btn-sm" onClick={onStart}>면접 연습</button>
        <button type="button" className="btn btn-text btn-sm" aria-label={`${company.company} 수정`} onClick={onEdit}>수정</button>
      </div>
    </li>
  );
}
