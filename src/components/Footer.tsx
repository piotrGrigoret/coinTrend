
export const Footer = () => {
    const CurrentYear = new Date().getFullYear();
  
    return (
        <footer>
                <nav>
                    <a href="https://cv-card.onrender.com/" target="_blank">Me</a>
                    <a href="https://github.com/piotrGrigoret" target="_blank">Github</a>
                    <a href="https://www.binance.com/en/binance-api" target="_blank">Api</a>
                </nav>
                <h4>{CurrentYear}</h4>
        </footer>
  )
}
