import notFound from "../assets/svg/404.svg"
export const NotFound = () => {
  return (
    <div className="container">
        <div className="notFound">
            <img className="notFound-img" src={notFound} alt="not found" />
            <h5>This page is not found😞</h5>
        </div>
        
    </div>
  )
}
