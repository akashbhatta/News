import { useNavigate, useParams } from 'react-router-dom';

const Categories = [
    {label: "All", value:""},
    {label: "Business", value: "business"},
    {label: "Entertainment", value: "entertainment"},
    {label: "Health", value: "health"},
    {label: "Science", value: "science"},
    {label: "Sports", value: "sports"},
    {label: "Technology", value: "technology"},
];
function CategoryList() {
    const navigate = useNavigate();
    const {category = ""} = useParams();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
        {Categories.map((cat)=>(
            <button key={cat.value}
            type="button"
            onClick={()=> navigate(cat.value ? `/category/${cat.value}` : "/")}
            aria-pressed = {category === cat.value}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              category === cat.value
                ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
            }`}
            >
              {cat.label}
            </button>
        ))}
    </div>
  )
}

export default CategoryList
