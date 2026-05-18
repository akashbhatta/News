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
    <div>
        {Categories.map((cat)=>(
            <button key={cat.value}
            type="button"
            onClick={()=> navigate(cat.value ? `/category/${cat.value}` : "/")}
            aria-pressed = {category === cat.value}>
                
                {cat.label}</button>
        ))}
    </div>
  )
}

export default CategoryList
