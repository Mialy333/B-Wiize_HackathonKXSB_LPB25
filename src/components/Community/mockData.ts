import { CommunityData } from './types';

export const mockCommunityData: CommunityData = {
  posts: [
    {
      id: '1',
      title: 'FIRE Hacks for Gen Z',
      body: 'Side hustles got me to $500 this month! I have been working on a few different gigs - freelance design work, dog walking, and selling vintage clothes online. The key is to find things that don\'t feel like work. I put 70% straight into index funds and 30% into my emergency fund. At this rate, I\'ll hit my first $10K by the end of the year. Anyone else working on FIRE strategies while in college?',
      author: {
        name: 'FIREStarter',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100&h=100'
      },
      votes: {
        up: 42,
        down: 3
      },
      comments: [
        {
          id: 'c1',
          author: {
            name: 'InvestorPro',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'Love this! I\'m doing something similar but focusing on tech freelancing. What platforms are you using for your design work?',
          votes: {
            up: 12,
            down: 0
          },
          replies: [
            {
              id: 'r1',
              author: {
                name: 'FIREStarter',
                avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100&h=100'
              },
              text: 'Mostly Fiverr and some local clients through my university\'s job board. The university connections actually pay better!',
              votes: {
                up: 8,
                down: 0
              },
              timestamp: '1h ago'
            },
            {
              id: 'r2',
              author: {
                name: 'DesignWhiz',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
              },
              text: 'Try Upwork too! I\'ve had great success there for higher-paying design gigs.',
              votes: {
                up: 5,
                down: 0
              },
              timestamp: '45m ago'
            }
          ],
          timestamp: '2h ago'
        },
        {
          id: 'c2',
          author: {
            name: 'FrugalStudent',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'What index funds are you investing in? I\'m trying to decide between VTI and VOO.',
          votes: {
            up: 7,
            down: 1
          },
          replies: [],
          timestamp: '3h ago'
        }
      ],
      timestamp: '5h ago',
      tags: ['FIRE', 'SideHustles', 'Investing']
    },
    {
      id: '2',
      title: 'Cheap Concert Tips',
      body: 'Use student IDs for half-price tix! I just scored tickets to see my favorite band for $25 instead of $50. Always check if venues have student discounts - many do but don\'t advertise it prominently. Also, volunteering at festivals can get you in for free! I worked 4 hours at a local music fest and got to enjoy the rest of the weekend at no cost. Anyone else have concert hacks?',
      author: {
        name: 'MusicLover',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
      },
      votes: {
        up: 38,
        down: 2
      },
      comments: [
        {
          id: 'c3',
          author: {
            name: 'ConcertQueen',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'Follow artists on social media! They sometimes release discount codes for fans or do flash sales.',
          votes: {
            up: 15,
            down: 0
          },
          replies: [],
          timestamp: '1h ago'
        }
      ],
      timestamp: '8h ago',
      tags: ['Entertainment', 'StudentDiscounts', 'Music']
    },
    {
      id: '3',
      title: 'Wellness on a Budget',
      body: 'Meditation apps under $5 have changed my life! I was struggling with stress from exams and money worries, but didn\'t want to spend $15/month on the popular meditation apps. Found a few alternatives that are either free or have student plans for under $5/month. My favorite is MindSpace which has a $3/month student plan. My anxiety is way down, and I\'m sleeping better too. What budget wellness hacks do you all use?',
      author: {
        name: 'ZenStudent',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
      },
      votes: {
        up: 29,
        down: 1
      },
      comments: [
        {
          id: 'c4',
          author: {
            name: 'YogaFan',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'YouTube has amazing free yoga channels! I\'ve been following \'Yoga With Adriene\' for months and haven\'t spent a dime.',
          votes: {
            up: 10,
            down: 0
          },
          replies: [
            {
              id: 'r3',
              author: {
                name: 'ZenStudent',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
              },
              text: 'Great suggestion! I\'ll check her channel out. Do you have any other YouTube wellness creators you recommend?',
              votes: {
                up: 3,
                down: 0
              },
              timestamp: '30m ago'
            }
          ],
          timestamp: '2h ago'
        },
        {
          id: 'c5',
          author: {
            name: 'MindfulSaver',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'Check if your university offers free counseling sessions. Mine gives students 6 free sessions per semester!',
          votes: {
            up: 18,
            down: 0
          },
          replies: [],
          timestamp: '4h ago'
        }
      ],
      timestamp: '12h ago',
      tags: ['Wellness', 'MentalHealth', 'Apps']
    },
    {
      id: '4',
      title: 'Thrift Shopping Transformed My Wardrobe',
      body: 'I used to spend $200+ on fast fashion every month, but switched to thrifting and now spend under $50 for better quality clothes! Found some amazing vintage pieces and even designer items with tags still on. My favorite find was a $300 jacket for just $15. The key is to visit stores in upscale neighborhoods and go regularly since inventory changes fast. Has anyone else had good thrifting experiences?',
      author: {
        name: 'ThriftQueen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
      },
      votes: {
        up: 25,
        down: 2
      },
      comments: [
        {
          id: 'c6',
          author: {
            name: 'FashionBro',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'Try Depop and ThredUp too! I\'ve found some incredible deals on those apps.',
          votes: {
            up: 8,
            down: 1
          },
          replies: [],
          timestamp: '3h ago'
        }
      ],
      timestamp: '1d ago',
      tags: ['Fashion', 'Thrifting', 'Sustainability']
    },
    {
      id: '5',
      title: 'How I Meal Prep for $25/Week',
      body: 'My grocery bill was killing my budget until I started serious meal prepping. Now I spend just $25/week on food! I cook everything on Sunday - usually a big batch of rice, roasted veggies, and a protein (beans, chicken, or tofu depending on sales). The key is buying seasonal produce and getting proteins on sale. I also started growing herbs on my windowsill which saves money and makes everything taste better. Anyone else have meal prep tips?',
      author: {
        name: 'BudgetChef',
        avatar: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=100&h=100'
      },
      votes: {
        up: 52,
        down: 0
      },
      comments: [
        {
          id: 'c7',
          author: {
            name: 'NutritionNerd',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
          },
          text: 'Frozen vegetables are your friend! Often cheaper than fresh and just as nutritious since they\'re frozen at peak ripeness.',
          votes: {
            up: 15,
            down: 0
          },
          replies: [
            {
              id: 'r4',
              author: {
                name: 'BudgetChef',
                avatar: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=100&h=100'
              },
              text: 'Great point! I use frozen berries for my breakfast oatmeal and they\'re way cheaper than fresh.',
              votes: {
                up: 7,
                down: 0
              },
              timestamp: '5h ago'
            }
          ],
          timestamp: '6h ago'
        }
      ],
      timestamp: '2d ago',
      tags: ['Food', 'MealPrep', 'Budgeting']
    }
  ],
  stats: {
    members: 1250,
    online: 78,
    founded: '2024-09-15'
  },
  rules: [
    'Keep discussions focused on finance and well-being',
    'Be respectful and supportive of others',
    'No promotion of get-rich-quick schemes',
    'Provide sources for financial claims when possible',
    'No spam or excessive self-promotion'
  ],
  pinnedPosts: [
    {
      id: 'pin1',
      title: 'Welcome to B-Wiize Community! Read our guidelines here'
    },
    {
      id: 'pin2',
      title: 'Monthly Challenge: Save $50 on food with meal prepping'
    }
  ]
};