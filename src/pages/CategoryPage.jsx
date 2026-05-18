import { useParams } from 'react-router-dom'
import HomePage from './HomePage';

function CategoryPage() {
    const {category} = useParams();
  return (
    <div>
        <h2>{category.charAt(0).toUpperCase()+category.slice(1)}News</h2>
        <HomePage/>
    </div>
  )
}

export default CategoryPage
