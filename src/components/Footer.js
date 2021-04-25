import { FiGithub } from "react-icons/fi"

const Footer = () => {
  return (
    <footer>
      <p className="Footer-text">
        Created By Akhand Patel
        <a href="https://github.com/akhand3108">
          <FiGithub style={{ marginLeft: "5px" }} />
        </a>
      </p>
    </footer>
  )
}

export default Footer
