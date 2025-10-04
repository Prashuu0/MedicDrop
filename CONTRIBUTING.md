# 🤝 Contributing to MedicDrop

Thank you for your interest in contributing to MedicDrop! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git
- Basic knowledge of React, Node.js, and MongoDB

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/MedicDrop.git
   cd MedicDrop
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy environment files
   cp env.example .env
   cd backend && cp env.example .env
   cd ../frontend && cp env.example .env
   ```

4. **Start development servers**
   ```bash
   # From root directory
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add comments for complex logic
- Follow React best practices

### Git Workflow
1. Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. Push and create a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format
Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🏗️ Project Structure

```
medicdrop/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── server.js           # Server entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── docs/                   # Documentation
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Test Coverage
- Aim for at least 80% test coverage
- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components

## 📝 Documentation

### Code Documentation
- Use JSDoc for function documentation
- Add README files for complex modules
- Update API documentation for new endpoints
- Include examples in documentation

### API Documentation
- Document all API endpoints
- Include request/response examples
- Specify authentication requirements
- Document error responses

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node.js version)

## 💡 Feature Requests

When suggesting features:
- Describe the use case
- Explain the expected behavior
- Consider implementation complexity
- Check if similar features exist

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Follow security best practices
- Report security vulnerabilities privately

## 📞 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Contact maintainers for urgent issues
- Read the documentation thoroughly

## 🎯 Areas for Contribution

### High Priority
- OCR integration improvements
- Real-time tracking enhancements
- Mobile responsiveness
- Performance optimizations
- Test coverage improvements

### Medium Priority
- Additional language support
- Advanced analytics features
- Integration with more payment gateways
- Enhanced security features
- Documentation improvements

### Low Priority
- UI/UX enhancements
- Additional themes
- Plugin system
- Advanced reporting features

## 🏆 Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation
- Community acknowledgments

## 📄 License

By contributing to MedicDrop, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MedicDrop! Together, we can revolutionize healthcare delivery in India. 🇮🇳
