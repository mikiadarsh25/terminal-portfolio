// React and ReactDOM are now available globally
var _s = $RefreshSig$();
const { createRoot } = window.ReactDOM;
const { useState, useRef, useEffect } = window.React;
// Terminal component
const COMMANDS = {
    help: `Available commands:\nabout\nexperience\neducation\nprojects\nskills\ncertifications\nachievements\nclear\nhelp`,
    about: `Adarsh Prakash\nBangalore, India | +91-7360858539 | mikidarsh25@gmail.com | linkedin | github`,
    experience: `Work Experience\n\nMember of Technical Staff-2\nAquera Labs Private Limited\nMay 2024 - Present\n- Developed and maintained server-side applications using Node.js and Express.js across 4+ microservices, integrating 30+ npm libraries for cross-functional identity management products.\n- Leveraged 25+ AWS services to scale infrastructure, improve reliability and reduce costs through resource optimization.\n- Designed and executed over 300 unit and integration tests using Mocha and Jest, maintaining test coverage from 70% to 90%.\n- Optimized over 100 complex SQL and NoSQL queries, resulting in a 25% improvement in average response time.\n- Resolved memory leaks and conducted stress/load testing with 10,000+ concurrent users, improving throughput by 30%.\n- Boosted application performance by 60% through Redis-based caching and DAX-enhanced read operations in DynamoDB.\n- Refactored legacy code into modular, reusable components, reducing technical debt and improving code maintainability by 40%.\n- Enabled secure partner access through a centralized IAM system with support for 3+ IDPs and self-service user management, cutting support effort by 60%.`,
    education: `Education\n\nNational Institute of Technology, Jamshedpur\nBachelor of Technology\nSep 2020 - May 2024`,
    projects: `Projects\n\nChat Application\n- Created a real-time chat app using Node.js, Socket.io, and Express with HTML, CSS, and Bootstrap, integrating popular APIs and libraries to enhance user experience and functionality.\n\nSmart Task Manager Application\n- Created a Smart Task Manager with task categorization, deadline tracking, and real-time notifications; secured with JWT, leveraged MongoDB for scalable storage, and structured a responsive, user-friendly UI.`,
    skills: `Skills\n\nLanguages: JavaScript, TypeScript, Python\nDatabases: PostgreSQL, MongoDB, SQLScript, DynamoDB, Redis\nCloud Services: AWS (Lambda, Elastic Beanstalk, S3, SQS, Event Bridge, Cloudwatch, SES, API Gateway, Cognito, Cloud Front, DAX, SNS, EC2, IAM, ECS)\nIdentity & Access Management (IAM): Okta, Azure Active Directory (Azure AD)\nFrameworks/Libraries: Node.js, Express.js, Mocha, Jest\nConcepts: Data Structures & Algorithms, Object-Oriented Programming, SCIM protocol, User Provisioning\nFrontend: HTML, CSS, Bootstrap\nTools/Technologies: Git, CI/CD, Microservices, JIRA, BitBucket, Agile`,
    certifications: `Certifications\n\n- Ultimate AWS Certified Cloud Practitioner - Udemy\n- JavaScript Algorithms and Data Structures by FreeCodeCamp\n- The Complete Node.js Developer Course - Udemy\n- Node JS: Advanced Concepts - Udemy`,
    achievements: `Achievements\n\n- Outstanding Delivery and Innovation Award for early product delivery and impactful contributions to two major project implementations.`
};
function Terminal() {
    _s();
    const [history, setHistory] = useState([
        {
            type: 'output',
            value: 'Welcome to Adarsh Prakash\'s Portfolio Terminal! Type `help` to get started.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    useEffect(()=>{
        if (isFocused) inputRef.current.focus();
    }, [
        isFocused
    ]);
    useEffect(()=>{
        window.addEventListener('click', ()=>setIsFocused(true));
        return ()=>window.removeEventListener('click', ()=>setIsFocused(true));
    }, []);
    const handleCommand = (cmd)=>{
        if (cmd === 'clear') {
            setHistory([]);
            return;
        }
        const output = COMMANDS[cmd] || `Command not found: ${cmd}. Type 'help' for a list of commands.`;
        setHistory((h)=>[
                ...h,
                {
                    type: 'input',
                    value: cmd
                },
                {
                    type: 'output',
                    value: output
                }
            ]);
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            handleCommand(input.trim());
            setInput('');
        }
    };
    return window.React.createElement('div', {
        className: 'terminal-container',
        onClick: ()=>setIsFocused(true)
    }, window.React.createElement('div', {
        className: 'terminal-window'
    }, history.map((item, idx)=>window.React.createElement('div', {
            key: idx,
            className: item.type === 'input' ? 'terminal-input-line' : 'terminal-output-line'
        }, item.type === 'input' ? window.React.createElement('span', {
            className: 'terminal-prompt'
        }, `$ ${item.value}`) : window.React.createElement('pre', null, item.value))), window.React.createElement('div', {
        className: 'terminal-input-line'
    }, window.React.createElement('span', {
        className: 'terminal-prompt'
    }, '$ '), window.React.createElement('input', {
        ref: inputRef,
        className: 'terminal-input',
        value: input,
        onChange: (e)=>setInput(e.target.value),
        onKeyDown: handleKeyDown,
        onBlur: ()=>setIsFocused(false),
        autoFocus: true
    }), window.React.createElement('span', {
        className: `terminal-cursor${isFocused ? ' blinking' : ''}`
    }, "\u2588"))));
}
_s(Terminal, "tly9D9Tsgsp/kv9moX8PiqW9qS4=");
_c = Terminal;
// App component
const App = ()=>{
    return window.React.createElement('div', {
        className: 'App'
    }, window.React.createElement(Terminal));
};
_c1 = App;
const rootElement = document.getElementById('root');
createRoot(rootElement).render(window.React.createElement(App));
var _c, _c1;
$RefreshReg$(_c, "Terminal");
$RefreshReg$(_c1, "App");

//# sourceMappingURL=portfolio-terminal.de158e3a.js.map
