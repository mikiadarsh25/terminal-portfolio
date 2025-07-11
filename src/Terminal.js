import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

// Simulated file system
const fileSystem = {
  '/': {
    type: 'directory',
    contents: {
      'about': {
        type: 'file',
        content: `Adarsh Prakash
Bangalore, India | +91-7360858539 | mikidarsh25@gmail.com | linkedin | github`
      },
      'experience': {
        type: 'file',
        content: `Work Experience

Member of Technical Staff-2
Aquera Labs Private Limited
May 2024 - Present

- Developed and maintained server-side applications using Node.js and Express.js across 4+ microservices, integrating 30+ npm libraries for cross-functional identity management products.
- Leveraged 25+ AWS services to scale infrastructure, improve reliability and reduce costs through resource optimization.
- Designed and executed over 300 unit and integration tests using Mocha and Jest, maintaining test coverage from 70% to 90%.
- Optimized over 100 complex SQL and NoSQL queries, resulting in a 25% improvement in average response time.
- Resolved memory leaks and conducted stress/load testing with 10,000+ concurrent users, improving throughput by 30%.
- Boosted application performance by 60% through Redis-based caching and DAX-enhanced read operations in DynamoDB.
- Refactored legacy code into modular, reusable components, reducing technical debt and improving code maintainability by 40%.
- Enabled secure partner access through a centralized IAM system with support for 3+ IDPs and self-service user management, cutting support effort by 60%.`
      },
      'education': {
        type: 'file',
        content: `Education

National Institute of Technology, Jamshedpur
Bachelor of Technology
Sep 2020 - May 2024`
      },
      'projects': {
        type: 'file',
        content: `Projects

Chat Application
- Created a real-time chat app using Node.js, Socket.io, and Express with HTML, CSS, and Bootstrap, integrating popular APIs and libraries to enhance user experience and functionality.

Smart Task Manager Application
- Created a Smart Task Manager with task categorization, deadline tracking, and real-time notifications; secured with JWT, leveraged MongoDB for scalable storage, and structured a responsive, user-friendly UI.`
      },
      'skills': {
        type: 'file',
        content: `Skills

Languages: JavaScript, TypeScript, Python
Databases: PostgreSQL, MongoDB, SQLScript, DynamoDB, Redis
Cloud Services: AWS (Lambda, Elastic Beanstalk, S3, SQS, Event Bridge, Cloudwatch, SES, API Gateway, Cognito, Cloud Front, DAX, SNS, EC2, IAM, ECS)
Identity & Access Management (IAM): Okta, Azure Active Directory (Azure AD)
Frameworks/Libraries: Node.js, Express.js, Mocha, Jest
Concepts: Data Structures & Algorithms, Object-Oriented Programming, SCIM protocol, User Provisioning
Frontend: HTML, CSS, Bootstrap
Tools/Technologies: Git, CI/CD, Microservices, JIRA, BitBucket, Agile`
      },
      'certifications': {
        type: 'file',
        content: `Certifications

- Ultimate AWS Certified Cloud Practitioner - Udemy
- JavaScript Algorithms and Data Structures by FreeCodeCamp
- The Complete Node.js Developer Course - Udemy
- Node JS: Advanced Concepts - Udemy`
      },
      'achievements': {
        type: 'file',
        content: `Achievements

- Outstanding Delivery and Innovation Award for early product delivery and impactful contributions to two major project implementations.`
      }
    }
  }
};

// File system and current path will be managed in component state

function Terminal() {
  const [history, setHistory] = useState([{
    type: 'output',
    value: 'Welcome to Adarsh Prakash\'s Portfolio Terminal!\nType `ls` to see available files, `cat <filename>` to read files, or `help` for available commands.'
  }]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) inputRef.current.focus();
  }, [isFocused]);

  useEffect(() => {
    window.addEventListener('click', () => setIsFocused(true));
    return () => window.removeEventListener('click', () => setIsFocused(true));
  }, []);

  const getCurrentDirectory = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    let current = fileSystem['/'];
    for (const part of pathParts) {
      if (current.contents && current.contents[part]) {
        current = current.contents[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const handleCommand = (cmd) => {
    // Add command to history if it's not empty
    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd.trim()]);
      setHistoryIndex(-1);
    }

    const args = cmd.trim().split(' ');
    const command = args[0];
    const arguments_ = args.slice(1);

    let output = '';

    switch (command) {
      case 'clear':
        setHistory([]);
        return;
      
      case 'ls': {
        const currentDir = getCurrentDirectory();
        if (currentDir && currentDir.type === 'directory') {
          const files = Object.keys(currentDir.contents);
          output = files.length > 0 ? files.join('  ') : '(empty directory)';
        } else {
          output = 'Error: Cannot access directory';
        }
        break;
      }
      
      case 'cat': {
        if (arguments_.length === 0) {
          output = 'cat: missing file operand\nTry \'cat --help\' for more information.';
        } else {
          const filename = arguments_[0];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir.contents && currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `cat: ${filename}: Is a directory`;
            }
          } else {
            output = `cat: ${filename}: No such file or directory`;
          }
        }
        break;
      }
      
      case 'grep': {
        if (arguments_.length < 2) {
          output = 'grep: missing pattern or file operand\nTry \'grep --help\' for more information.';
        } else {
          const pattern = arguments_[0];
          const filename = arguments_[1];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir.contents && currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
              const lines = file.content.split('\n');
              const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
              output = matches.length > 0 ? matches.join('\n') : '(no matches found)';
            } else {
              output = `grep: ${filename}: Is a directory`;
            }
          } else {
            output = `grep: ${filename}: No such file or directory`;
          }
        }
        break;
      }
      
      case 'head': {
        if (arguments_.length === 0) {
          output = 'head: missing file operand\nTry \'head --help\' for more information.';
        } else {
          const filename = arguments_[0];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir.contents && currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
              const lines = file.content.split('\n');
              output = lines.slice(0, 10).join('\n');
            } else {
              output = `head: ${filename}: Is a directory`;
            }
          } else {
            output = `head: ${filename}: No such file or directory`;
          }
        }
        break;
      }
      
      case 'tail': {
        if (arguments_.length === 0) {
          output = 'tail: missing file operand\nTry \'tail --help\' for more information.';
        } else {
          const filename = arguments_[0];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir.contents && currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
              const lines = file.content.split('\n');
              output = lines.slice(-10).join('\n');
            } else {
              output = `tail: ${filename}: Is a directory`;
            }
          } else {
            output = `tail: ${filename}: No such file or directory`;
          }
        }
        break;
      }
      
      case 'wc': {
        if (arguments_.length === 0) {
          output = 'wc: missing file operand\nTry \'wc --help\' for more information.';
        } else {
          const filename = arguments_[0];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir.contents && currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
              const lines = file.content.split('\n');
              const words = file.content.split(/\s+/).filter(word => word.length > 0);
              const chars = file.content.length;
              output = `  ${lines.length}  ${words.length} ${chars} ${filename}`;
            } else {
              output = `wc: ${filename}: Is a directory`;
            }
          } else {
            output = `wc: ${filename}: No such file or directory`;
          }
        }
        break;
      }
      
      case 'pwd':
        output = currentPath;
        break;
      
      case 'cd':
        if (arguments_.length === 0 || arguments_[0] === '~') {
          setCurrentPath('/');
          output = '';
        } else if (arguments_[0] === '..') {
          const newPath = currentPath.split('/').slice(0, -1).join('/') || '/';
          setCurrentPath(newPath);
          output = '';
        } else {
          output = `cd: ${arguments_[0]}: No such file or directory`;
        }
        break;
      
      case 'help':
        output = `Available commands:
ls <dir>          - List directory contents
cat <file>        - Display file contents
grep <pattern> <file> - Search for pattern in file
head <file>       - Display first 10 lines of file
tail <file>       - Display last 10 lines of file
wc <file>         - Count lines, words, and characters
pwd               - Print working directory
cd <dir>          - Change directory
clear             - Clear terminal
help              - Show this help message

Available files: about, experience, education, projects, skills, certifications, achievements`;
        break;
      
      case '':
        output = '';
        break;
      
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory((h) => [...h, { type: 'input', value: cmd }, { type: 'output', value: output }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input.trim());
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal-container" onClick={() => setIsFocused(true)}>
      <div className="terminal-window">
        {history.map((item, idx) => (
          <div key={idx} className={item.type === 'input' ? 'terminal-input-line' : 'terminal-output-line'}>
            {item.type === 'input' ? (
              <span className="terminal-prompt">$ {item.value}</span>
            ) : (
              <pre>{item.value}</pre>
            )}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt">$ {currentPath} </span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
            autoFocus
          />
          <span className={`terminal-cursor${isFocused ? ' blinking' : ''}`}>█</span>
        </div>
      </div>
    </div>
  );
}

export default Terminal; 