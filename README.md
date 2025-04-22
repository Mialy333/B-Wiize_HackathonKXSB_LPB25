# B-Wiize: Student Finance App

![B-Wiize Logo](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=400)

## Overview

B-Wiize is a modern financial literacy and management application designed specifically for students. The platform combines gamification elements with practical financial education to help students develop healthy financial habits, track expenses, and build financial literacy in an engaging way.

## Features

### Financial Overview
- **Dashboard**: View your available balance, expenses by category, and upcoming payments
- **DeFi Wallet Integration**: Connect to XRPL-based wallets to manage cryptocurrency
- **Escrow System**: Lock XRP that gets released upon completing challenges

### Challenges
- **Daily Challenges**: Complete financial tasks to earn rewards and XP
- **Leaderboard**: Compete with other students to climb the ranks
- **Escrow Rewards**: Unlock cryptocurrency rewards by completing challenge sets

### Education
- **Learning Modules**: Structured financial education content organized by difficulty
- **Interactive Quizzes**: Test your knowledge and earn badges
- **Audio Lessons**: Listen to financial education content with a full-featured audio player
- **Progress Tracking**: Track your learning journey with XP and level progression

### News
- **Financial Articles**: Stay updated with the latest financial news and tips
- **Trending Content**: Discover popular articles in the community
- **Bookmarking**: Save articles for later reading

### Community
- **Discussion Forum**: Engage with other students about financial topics
- **Post Creation**: Share your financial insights and questions
- **Voting System**: Upvote helpful content and comments

### Rewards
- **Achievement Badges**: Earn NFT badges for completing financial milestones
- **XP System**: Level up as you engage with the platform
- **XRPL Integration**: Badges are minted as NFTs on the XRP Ledger

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React
- **State Management**: React Context API
- **Blockchain Integration**: XRP Ledger (XRPL) for DeFi features

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/b-wiize.git
   cd b-wiize
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/           # UI components organized by feature
│   ├── Challenges/       # Challenge-related components
│   ├── Community/        # Community forum components
│   ├── Education/        # Learning modules and quizzes
│   ├── FinancialOverview/# Dashboard and financial tracking
│   ├── News/             # Financial news components
│   ├── Rewards/          # Achievement and badge system
│   └── ...
├── ThemeContext.tsx      # Dark/light mode context provider
└── App.tsx               # Main application component
```

## Features in Detail

### DeFi Integration

B-Wiize integrates with the XRP Ledger to provide students with practical experience in managing digital assets:

- **Wallet Connection**: Connect your XRPL wallet to track balances
- **Escrow Mechanism**: Lock XRP that gets released upon completing challenges
- **NFT Badges**: Earn non-fungible tokens as proof of achievement

### Gamification Elements

The platform uses game mechanics to make financial education engaging:

- **XP and Levels**: Earn experience points for activities and level up
- **Challenges**: Complete daily and long-term financial challenges
- **Leaderboards**: Compete with peers on financial literacy achievements
- **Badges**: Collect achievement badges that evolve as you progress

### Educational Content

Structured learning path with content for different knowledge levels:

- **Intro Modules**: Basic financial concepts for beginners
- **Core Modules**: Essential financial skills every student needs
- **Advanced Modules**: Complex topics like investing and FIRE strategies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Financial education content inspired by modern personal finance principles
- UI design influenced by gamified educational platforms
- XRPL integration based on best practices for blockchain applications