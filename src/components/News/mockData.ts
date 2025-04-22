import { NewsData } from './types';

export const mockNewsData: NewsData = {
  discover: [
    {
      id: '1',
      title: 'Government Boosts Housing Aid for Students',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#HousingAid', '#StudentLife'],
      date: '2025-02-22',
      readTime: '4 min',
      votes: {
        up: 20,
        down: 3
      },
      topComment: {
        text: 'Finally some relief!',
        likes: 10
      },
      content: 'New government initiative increases housing support for students by 15%. The program aims to help students cope with rising rental costs in university cities...',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Financial Advisor'
      },
      isSaved: false
    },
    {
      id: '2',
      title: 'Electricity Rates Up: How to Save',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#Utilities', '#BudgetHacks'],
      date: '2025-02-18',
      readTime: '6 min',
      votes: {
        up: 12,
        down: 1
      },
      topComment: {
        text: 'Switching providers worked!',
        likes: 7
      },
      content: 'With electricity rates rising across the country, students need to be smart about their energy usage. Here are proven strategies to reduce your utility bills...',
      author: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Energy Consultant'
      },
      isSaved: false
    },
    {
      id: '3',
      title: 'Tax Credits Students Miss Out On',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#Taxes', '#MoneySaving'],
      date: '2025-02-15',
      readTime: '5 min',
      votes: {
        up: 25,
        down: 4
      },
      topComment: {
        text: 'Claimed $200 back!',
        likes: 12
      },
      content: 'Many students are unaware of tax credits they qualify for. From education expenses to remote learning equipment, here\'s what you might be missing...',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Tax Specialist'
      },
      isSaved: true
    },
    {
      id: '4',
      title: 'Side Hustles Pay More in 2025',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#SideHustle', '#IncomeBoost'],
      date: '2025-02-10',
      readTime: '7 min',
      votes: {
        up: 18,
        down: 2
      },
      topComment: {
        text: 'Started freelancing!',
        likes: 9
      },
      content: 'The gig economy is evolving, and students are prime candidates for these flexible opportunities. From virtual tutoring to content creation...',
      author: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Freelance Coach'
      },
      isSaved: false
    }
  ],
  following: [
    {
      id: '5',
      title: 'Student Meal Prep Revolution',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#MealPrep', '#SaveMoney'],
      date: '2025-02-20',
      readTime: '5 min',
      votes: {
        up: 15,
        down: 2
      },
      topComment: {
        text: 'Saved $150 this month!',
        likes: 8
      },
      content: 'Transform your food budget with these innovative meal prep strategies. Learn how to cook once and eat healthy all week...',
      author: {
        name: 'Sofia Patel',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Nutrition Expert'
      },
      isSaved: true
    },
    {
      id: '6',
      title: 'Digital Textbook Deals Guide',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800&h=400',
      hashtags: ['#TextBooks', '#StudentSavings'],
      date: '2025-02-17',
      readTime: '4 min',
      votes: {
        up: 22,
        down: 3
      },
      topComment: {
        text: 'Found all my books for cheap!',
        likes: 11
      },
      content: 'Stop overpaying for textbooks! This comprehensive guide shows you where to find the best deals on digital textbooks and educational resources...',
      author: {
        name: 'David Thompson',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=100&h=100',
        role: 'Student Advocate'
      },
      isSaved: true
    }
  ]
};