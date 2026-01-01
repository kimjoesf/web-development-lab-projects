 
const NavFooter = () => {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "auto", gap: 30 }}>
        <nav className={"footerNavLinks"}>
            <a href="https://www.reddit.com/rules/">Reddit Rules</a> •
            <a href="https://www.reddit.com/policies/privacy-policy">Privacy Policy</a> •
            <a href="https://www.reddit.com/policies/user-agreement">User Agreement</a> •
            <a href="https://www.reddit.com/accessibility/">Accessibility</a>
            <a href="https://redditinc.com/">© 2025 Reddit, Inc. All rights reserved.</a>
        </nav>
    </div>
  )
}

export default NavFooter