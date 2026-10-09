import { RecordLogo } from "../ui";

export default function FavoriteCompanyCard({ company, index, onStart, onEdit }) {
  return <article className="dream-item"><RecordLogo company={company.company} job={company.job} idx={index} /><div className="dream-info"><h3 className="dream-co">{company.company}</h3><p className="dream-job">{[company.job, company.sub].filter(Boolean).join(" · ") || "직무 미정"}</p></div><div className="dream-acts"><button type="button" className="dream-go" onClick={onStart}>면접 연습</button><button type="button" className="dream-more" aria-label={`${company.company} 수정`} onClick={onEdit}>수정</button></div></article>;
}
