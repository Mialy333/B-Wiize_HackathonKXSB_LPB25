import { EducationData } from './types';
import {
  Wallet,
  Calculator,
  DollarSign,
  PiggyBank,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  Briefcase,
  LineChart,
  Flame
} from 'lucide-react';

export const mockEducationData: EducationData = {
  moduleGroups: {
    intro: {
      id: 'intro',
      title: 'Why Should You Care About Money?',
      description: 'Understand your relationship with money and set the foundation for financial success.',
      units: [
        {
          id: 1,
          title: 'Your Money Mindset',
          description: 'Discover how your beliefs about money shape your financial decisions and learn to develop a growth mindset.',
          status: 'completed',
          icon: Wallet,
          progress: { current: 3, total: 3 },
          content: {
            podcast: 'mindset.mp3',
            text: 'Your money mindset is the set of beliefs and attitudes you have about money. These beliefs are often formed in childhood and can significantly impact your financial decisions throughout life. A scarcity mindset leads to fear-based decisions, while an abundance mindset focuses on opportunities and growth. To develop a healthier money mindset, start by identifying your current beliefs. Do you think money is hard to earn? Do you believe wealthy people are greedy? Challenge these assumptions with evidence. Practice gratitude for what you have while setting ambitious goals. Remember that your financial situation is not fixed—with the right mindset and actions, you can transform your relationship with money.',
            playbackSpeed: 1,
            video: '/videos/mindset.mp4',
            infographic: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=400'
          },
          quiz: {
            id: 'quiz-1',
            title: 'Money Mindset Mastery',
            description: 'Test your understanding of money mindset concepts',
            questions: [
              {
                id: 'q1-1',
                question: 'What is a scarcity mindset?',
                options: [
                  'Believing there\'s never enough money to go around',
                  'Being careful with spending',
                  'Saving for emergencies',
                  'Investing conservatively'
                ],
                correctAnswer: 0,
                explanation: 'A scarcity mindset is the belief that there will never be enough resources (like money), leading to fear-based financial decisions.'
              },
              {
                id: 'q1-2',
                question: 'How can you develop an abundance mindset?',
                options: [
                  'Only by earning more money',
                  'By practicing gratitude and focusing on opportunities',
                  'By spending freely',
                  'By avoiding financial planning'
                ],
                correctAnswer: 1,
                explanation: 'An abundance mindset can be developed through practicing gratitude for what you have while recognizing opportunities for growth, regardless of your current financial situation.'
              },
              {
                id: 'q1-3',
                question: 'Why is your money mindset important?',
                options: [
                  'It only affects how you feel about money',
                  'It has no real impact on financial decisions',
                  'It shapes your financial behaviors and decisions',
                  'It only matters for wealthy people'
                ],
                correctAnswer: 2,
                explanation: 'Your money mindset is crucial because it directly shapes your financial behaviors, decisions, and ultimately your financial outcomes.'
              }
            ],
            reward: {
              xp: 100,
              badge: 'Kitten Learner'
            }
          },
          votes: {
            up: 42,
            down: 3
          },
          comments: [
            {
              id: 'c1',
              author: 'MoneyMaker22',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
              text: 'This completely changed how I think about money! I realized I had a scarcity mindset from my parents.',
              date: '2025-02-15',
              likes: 12
            },
            {
              id: 'c2',
              author: 'FutureBillionaire',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
              text: 'The abundance mindset techniques actually helped me land a side gig that pays $200/week!',
              date: '2025-02-14',
              likes: 8
            }
          ],
          xp: 100
        }
      ],
      unlockRequirement: 0
    },
    core: {
      id: 'core',
      title: 'Microlearning Basics',
      description: 'Master the essential financial skills every Gen Z needs to know.',
      units: [
        {
          id: 2,
          title: 'Earning Money',
          description: 'Explore modern ways to earn income through side hustles, freelancing, and the gig economy.',
          status: 'in-progress',
          icon: Briefcase,
          progress: { current: 1, total: 3 },
          content: {
            podcast: 'earning.mp3',
            text: 'The traditional 9-to-5 job is no longer the only path to earning money. Today\'s digital economy offers countless opportunities to generate income on your own terms. Side hustles like content creation, dropshipping, or freelancing can supplement your main income or even become your primary source of revenue. The gig economy, through platforms like Uber, Fiverr, or TaskRabbit, allows you to monetize your skills and time flexibly. When choosing income streams, consider your skills, interests, and time constraints. Start small and experiment with different options. Remember that consistency is key—even a few hours per week can build into significant income over time. Track your earnings carefully for tax purposes, and reinvest some profits to scale your most successful ventures.',
            playbackSpeed: 1,
            video: '/videos/earning.mp4'
          },
          quiz: {
            id: 'quiz-2',
            title: 'Income Generation',
            description: 'Test your knowledge about modern earning opportunities',
            questions: [
              {
                id: 'q2-1',
                question: 'Which of these is NOT typically considered a side hustle?',
                options: [
                  'Content creation',
                  'Dropshipping',
                  'Full-time employment',
                  'Freelance graphic design'
                ],
                correctAnswer: 2,
                explanation: 'Full-time employment is a traditional job arrangement, not a side hustle. Side hustles are typically flexible, part-time income sources in addition to main employment or studies.'
              },
              {
                id: 'q2-2',
                question: 'What is a key advantage of gig economy work?',
                options: [
                  'Guaranteed stable income',
                  'Health insurance benefits',
                  'Flexibility to choose when and how much you work',
                  'Automatic retirement contributions'
                ],
                correctAnswer: 2,
                explanation: 'The primary advantage of gig economy work is the flexibility to choose when, where, and how much you work, allowing you to fit earning around your schedule.'
              },
              {
                id: 'q2-3',
                question: 'What\'s an important consideration when starting multiple side hustles?',
                options: [
                  'Always pursue as many as possible simultaneously',
                  'Focus only on the highest-paying opportunities',
                  'Balance time investment with potential return',
                  'Avoid digital platforms entirely'
                ],
                correctAnswer: 2,
                explanation: 'When managing multiple side hustles, it\'s crucial to balance the time you invest with the potential return, focusing on those that provide the best value for your time and effort.'
              }
            ],
            reward: {
              xp: 150
            }
          },
          votes: {
            up: 28,
            down: 5
          },
          comments: [
            {
              id: 'c3',
              author: 'SideHustleQueen',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
              text: 'Started a print-on-demand store after this unit and made my first $50 last week!',
              date: '2025-02-10',
              likes: 15
            }
          ],
          xp: 150
        },
        {
          id: 3,
          title: 'Spending Wisely',
          description: 'Learn to make intentional spending decisions and manage subscription services effectively.',
          status: 'locked',
          icon: ShoppingCart,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'spending.mp3',
            text: 'Smart spending isn\'t about depriving yourself—it\'s about intentional choices that align with your values and goals. Start by tracking your expenses to understand where your money goes. Distinguish between needs (essentials) and wants (nice-to-haves). The subscription economy has made it easier than ever to spend without thinking—streaming services, meal kits, apps, and memberships can quickly add up to hundreds of dollars monthly. Audit your subscriptions regularly and consider subscription management apps to help identify unused services. Before making purchases, especially larger ones, implement the 24-hour rule: wait a day before buying to avoid impulse decisions. Look for student discounts, use cashback apps, and consider buying used for items that depreciate quickly. Remember that frugality is about maximizing value, not minimizing cost.',
            playbackSpeed: 1,
            infographic: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=400'
          },
          quiz: {
            id: 'quiz-3',
            title: 'Smart Spending',
            description: 'Test your knowledge about effective spending habits',
            questions: [
              {
                id: 'q3-1',
                question: 'What is the 24-hour rule for purchases?',
                options: [
                  'All stores must process returns within 24 hours',
                  'Wait 24 hours before making non-essential purchases',
                  'Only shop during 24-hour sales',
                  'Check prices across 24 different stores'
                ],
                correctAnswer: 1,
                explanation: 'The 24-hour rule suggests waiting 24 hours before making non-essential purchases to avoid impulse buying and ensure the purchase aligns with your values and budget.'
              },
              {
                id: 'q3-2',
                question: 'Why should you regularly audit your subscriptions?',
                options: [
                  'To increase the number of services you use',
                  'Because subscription prices never change',
                  'To identify and cancel unused or underused services',
                  'It\'s not necessary if you use automatic payments'
                ],
                correctAnswer: 2,
                explanation: 'Regular subscription audits help you identify services you no longer use or value, preventing ongoing charges for things that don\'t benefit you.'
              },
              {
                id: 'q3-3',
                question: 'What does "intentional spending" mean?',
                options: [
                  'Never spending money on enjoyment',
                  'Making purchase decisions that align with your values and goals',
                  'Always buying the cheapest option',
                  'Only spending on necessities'
                ],
                correctAnswer: 1,
                explanation: 'Intentional spending means making conscious purchase decisions that align with your personal values and financial goals, rather than spending impulsively or without purpose.'
              }
            ],
            reward: {
              xp: 150
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 150
        },
        {
          id: 4,
          title: 'Saving & Emergency Funds',
          description: 'Discover effective saving strategies and learn how to build a financial safety net.',
          status: 'locked',
          icon: PiggyBank,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'saving.mp3',
            text: 'Saving money is the foundation of financial security and future opportunities. The first saving priority should be establishing an emergency fund—a financial buffer that can cover unexpected expenses like medical bills, car repairs, or job loss. For students and young adults, aim to save 3-6 months of essential expenses. Start small if necessary; even $500 can prevent many financial emergencies from becoming disasters. Make saving automatic by setting up recurring transfers to a separate high-yield savings account on payday—this "pay yourself first" approach ensures saving happens before discretionary spending. Consider using round-up apps that save small amounts with each purchase, making the process painless. For larger saving goals like travel or major purchases, create dedicated "sinking funds" with specific targets and timelines. Remember that consistency matters more than amount—small regular contributions add up significantly over time thanks to compound interest.',
            playbackSpeed: 1,
            video: '/videos/saving.mp4'
          },
          quiz: {
            id: 'quiz-4',
            title: 'Saving Essentials',
            description: 'Test your understanding of saving strategies',
            questions: [
              {
                id: 'q4-1',
                question: 'How large should an emergency fund typically be?',
                options: [
                  '$100-$200',
                  '$500-$1,000 to start, building to 3-6 months of expenses',
                  'At least 12 months of income',
                  'There\'s no need for an emergency fund if you have credit cards'
                ],
                correctAnswer: 1,
                explanation: 'Financial experts recommend starting with $500-$1,000 to cover minor emergencies, then building toward 3-6 months of essential expenses for comprehensive protection.'
              },
              {
                id: 'q4-2',
                question: 'What is a "sinking fund"?',
                options: [
                  'A fund that loses value over time',
                  'An investment in declining industries',
                  'A dedicated savings account for a specific planned expense',
                  'A type of retirement account'
                ],
                correctAnswer: 2,
                explanation: 'A sinking fund is a savings account dedicated to a specific planned future expense, like a vacation, car, or holiday gifts, allowing you to save gradually rather than facing a large expense all at once.'
              },
              {
                id: 'q4-3',
                question: 'What does "pay yourself first" mean?',
                options: [
                  'Taking your entire paycheck as cash',
                  'Prioritizing personal spending before bills',
                  'Automatically saving a portion of income before discretionary spending',
                  'Paying off all debts before saving anything'
                ],
                correctAnswer: 2,
                explanation: '"Pay yourself first" means automatically setting aside money for savings as soon as you receive income, before spending on non-essentials, treating savings as a non-negotiable expense.'
              }
            ],
            reward: {
              xp: 200
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 150
        },
        {
          id: 5,
          title: 'Investing Basics',
          description: 'Learn the fundamentals of investing in stocks, crypto, and NFTs with a focus on risk management.',
          status: 'locked',
          icon: LineChart,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'investing.mp3',
            text: 'Investing is how you put your money to work, potentially growing your wealth beyond what saving alone can achieve. The earlier you start, the more you benefit from compound growth. Before investing, ensure you have an emergency fund and manageable debt. Traditional investments include stocks (ownership in companies), bonds (loans to companies or governments), and index funds (collections of many stocks/bonds). Digital assets like cryptocurrencies and NFTs offer high-risk, high-reward alternatives. For beginners, index funds like S&P 500 ETFs offer diversification and historically reliable returns. If exploring crypto, start with established coins like Bitcoin or Ethereum, investing only what you can afford to lose (typically 5% or less of your portfolio). NFTs are highly speculative—approach with extreme caution and thorough research. Regardless of investment type, the key principles remain: diversify to spread risk, invest regularly through dollar-cost averaging, and maintain a long-term perspective despite market fluctuations.',
            playbackSpeed: 1,
            infographic: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&h=400'
          },
          quiz: {
            id: 'quiz-5',
            title: 'Investment Fundamentals',
            description: 'Test your knowledge about different investment options',
            questions: [
              {
                id: 'q5-1',
                question: 'What is an index fund?',
                options: [
                  'A single stock in a major company',
                  'A collection of investments that track a market index like the S&P 500',
                  'A cryptocurrency exchange',
                  'A government bond'
                ],
                correctAnswer: 1,
                explanation: 'An index fund is a type of investment that holds a collection of stocks or bonds designed to track the performance of a specific market index, like the S&P 500, offering instant diversification.'
              },
              {
                id: 'q5-2',
                question: 'What is dollar-cost averaging?',
                options: [
                  'Converting all investments to US dollars',
                  'Investing a fixed amount at regular intervals regardless of price',
                  'Always buying at the lowest possible price',
                  'Calculating the average return on investments'
                ],
                correctAnswer: 1,
                explanation: 'Dollar-cost averaging is the strategy of investing a fixed amount at regular intervals regardless of market prices, which reduces the impact of volatility and removes the pressure of trying to time the market.'
              },
              {
                id: 'q5-3',
                question: 'What percentage of your investment portfolio should typically be in high-risk assets like cryptocurrency?',
                options: [
                  '50% or more',
                  '25-30%',
                  '5-10% or less',
                  'None, they\'re too risky'
                ],
                correctAnswer: 2,
                explanation: 'Financial experts generally recommend limiting high-risk speculative investments like cryptocurrency to 5-10% or less of your total investment portfolio to manage risk appropriately.'
              }
            ],
            reward: {
              xp: 200,
              badge: 'Curious Feline'
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 200
        },
        {
          id: 6,
          title: 'Debt Management',
          description: 'Understand different types of debt and develop strategies for responsible borrowing.',
          status: 'locked',
          icon: CreditCard,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'debt.mp3',
            text: 'Not all debt is created equal. "Good debt" can help build wealth or increase earning potential, like student loans or mortgages. "Bad debt" typically finances depreciating assets or consumption, like credit card debt or payday loans. Student loans are often necessary investments in your future, but borrow only what you need and understand repayment terms. Credit cards can be powerful tools when used responsibly—they build credit history and offer rewards—but they can also lead to high-interest debt if not paid in full monthly. Buy Now, Pay Later (BNPL) services like Afterpay or Klarna can seem convenient but may encourage overspending and typically lack the consumer protections of credit cards. If you accumulate debt, prioritize high-interest balances first (avalanche method) or start with small balances for psychological wins (snowball method). Remember that your credit score impacts future borrowing ability, so make payments on time and keep credit utilization below 30% of available credit.',
            playbackSpeed: 1,
            video: '/videos/debt.mp4'
          },
          quiz: {
            id: 'quiz-6',
            title: 'Debt Management Strategies',
            description: 'Test your understanding of different types of debt and repayment strategies',
            questions: [
              {
                id: 'q6-1',
                question: 'What is the difference between "good debt" and "bad debt"?',
                options: [
                  'Good debt has lower interest rates; bad debt has higher rates',
                  'Good debt is from banks; bad debt is from other lenders',
                  'Good debt potentially increases your net worth; bad debt typically doesn\'t',
                  'Good debt is tax-deductible; bad debt isn\'t'
                ],
                correctAnswer: 2,
                explanation: 'Good debt generally helps build wealth or increase earning potential (like education loans or mortgages), while bad debt typically finances consumption or depreciating assets (like credit card debt for non-essentials).'
              },
              {
                id: 'q6-2',
                question: 'What is the avalanche method of debt repayment?',
                options: [
                  'Paying off the smallest debts first',
                  'Paying off the highest-interest debts first',
                  'Paying equal amounts toward all debts',
                  'Consolidating all debts into one loan'
                ],
                correctAnswer: 1,
                explanation: 'The avalanche method involves paying minimum payments on all debts while putting extra money toward the highest-interest debt first, then moving to the next highest after it\'s paid off, saving the most money in interest.'
              },
              {
                id: 'q6-3',
                question: 'What is a potential risk of Buy Now, Pay Later (BNPL) services?',
                options: [
                  'They always charge higher interest than credit cards',
                  'They may encourage overspending by making purchases seem more affordable',
                  'They always report to credit bureaus',
                  'They require large down payments'
                ],
                correctAnswer: 1,
                explanation: 'A significant risk of BNPL services is that they can encourage overspending by making purchases seem more affordable through splitting payments, potentially leading to financial strain if overused.'
              }
            ],
            reward: {
              xp: 150
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 150
        },
        {
          id: 7,
          title: 'Taxes & Legal Basics',
          description: 'Navigate tax filing, deductions, and essential legal concepts for financial protection.',
          status: 'locked',
          icon: Calculator,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'taxes.mp3',
            text: 'Understanding taxes is crucial, especially as you begin earning income from multiple sources. As a student or young adult, you may qualify for education tax credits like the American Opportunity Credit or Lifetime Learning Credit. If you have side hustles or freelance work, you\'re considered self-employed and must report this income, but you can also deduct related business expenses. Keep organized records of income and expenses throughout the year—apps like Everlance or Stride can help track business mileage and expenses. For simple tax situations, free filing options like IRS Free File or tax prep software may be sufficient. Beyond taxes, basic legal protections include renters insurance (protecting your belongings), health insurance (now more affordable through ACA subsidies), and eventually, simple estate planning documents like a will and power of attorney. For students with significant assets or complex situations, consulting with a tax professional or financial advisor can provide personalized guidance and potentially save money through proper planning.',
            playbackSpeed: 1,
            infographic: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800&h=400'
          },
          quiz: {
            id: 'quiz-7',
            title: 'Tax & Legal Essentials',
            description: 'Test your knowledge about taxes and basic legal protections',
            questions: [
              {
                id: 'q7-1',
                question: 'What is the American Opportunity Tax Credit?',
                options: [
                  'A credit for starting a small business',
                  'A credit for first-time homebuyers',
                  'An education tax credit for eligible college students',
                  'A credit for retirement savings'
                ],
                correctAnswer: 2,
                explanation: 'The American Opportunity Tax Credit is an education tax credit worth up to $2,500 per eligible student for qualified education expenses paid for the first four years of higher education.'
              },
              {
                id: 'q7-2',
                question: 'If you earn money from a side hustle, how is this typically classified for tax purposes?',
                options: [
                  'It\'s exempt from taxes if under $10,000',
                  'As self-employment income, reported on Schedule C',
                  'As a gift, which isn\'t taxable',
                  'It\'s only taxable if paid by check or direct deposit'
                ],
                correctAnswer: 1,
                explanation: 'Income from side hustles, freelancing, or gig work is typically classified as self-employment income, which must be reported on Schedule C of your tax return, regardless of whether you receive a 1099 form.'
              },
              {
                id: 'q7-3',
                question: 'What does renters insurance typically cover?',
                options: [
                  'Only damage you cause to the rental property',
                  'Your personal belongings, liability, and additional living expenses if your home becomes uninhabitable',
                  'Only theft, not other types of damage',
                  'The physical structure of your rental unit'
                ],
                correctAnswer: 1,
                explanation: 'Renters insurance typically covers your personal belongings against theft or damage, provides liability coverage if someone is injured in your home, and pays for additional living expenses if your rental becomes uninhabitable due to a covered event.'
              }
            ],
            reward: {
              xp: 150
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 150
        }
      ],
      unlockRequirement: 1
    },
    advanced: {
      id: 'advanced',
      title: 'Level Up Your Finances',
      description: 'Take your financial knowledge to the next level with advanced concepts and strategies.',
      units: [
        {
          id: 8,
          title: 'Investing Deeper',
          description: 'Explore advanced investment strategies, index funds, and understand cryptocurrency risks.',
          status: 'locked',
          icon: LineChart,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'investing_advanced.mp3',
            text: 'Beyond basic investing lies a world of more sophisticated strategies. Index investing through low-cost ETFs or mutual funds remains one of the most effective approaches for long-term wealth building. These funds provide instant diversification across hundreds or thousands of companies with minimal fees. For those interested in individual stocks, fundamental analysis examines company financials and business models, while technical analysis studies price patterns and trading volumes. Cryptocurrency investing requires special consideration—while potentially lucrative, the extreme volatility and regulatory uncertainty make it speculative. If exploring this space, understand blockchain technology fundamentals, research projects thoroughly, use reputable exchanges with strong security, and implement cold storage for significant holdings. Alternative investments like real estate investment trusts (REITs) offer property exposure without direct ownership. Regardless of investment type, tax efficiency matters—consider tax-advantaged accounts like Roth IRAs for long-term investments. Remember that complexity doesn\'t necessarily improve returns; often, simple, consistent investment strategies outperform complex ones over time.',
            playbackSpeed: 1,
            video: '/videos/investing_advanced.mp4'
          },
          quiz: {
            id: 'quiz-8',
            title: 'Advanced Investment Concepts',
            description: 'Test your understanding of sophisticated investment strategies',
            questions: [
              {
                id: 'q8-1',
                question: 'What is a key advantage of index funds over actively managed funds?',
                options: [
                  'They always outperform the market',
                  'They have lower expense ratios (fees)',
                  'They are less risky than bonds',
                  'They only invest in technology companies'
                ],
                correctAnswer: 1,
                explanation: 'Index funds typically have significantly lower expense ratios (fees) than actively managed funds, which means more of your money stays invested and compounds over time, often leading to better long-term performance.'
              },
              {
                id: 'q8-2',
                question: 'What is "cold storage" in cryptocurrency investing?',
                options: [
                  'Storing cryptocurrency on an exchange',
                  'Keeping crypto in a refrigerated server',
                  'Storing crypto offline in a hardware wallet or paper wallet',
                  'Freezing your trading account during market volatility'
                ],
                correctAnswer: 2,
                explanation: 'Cold storage refers to keeping cryptocurrency offline in hardware wallets, paper wallets, or other offline methods, protecting it from online hacking threats that could affect exchanges or online wallets.'
              },
              {
                id: 'q8-3',
                question: 'What is a REIT?',
                options: [
                  'A retirement investment account',
                  'A real estate investment trust that allows you to invest in properties without direct ownership',
                  'A tax form for investment income',
                  'A type of cryptocurrency'
                ],
                correctAnswer: 1,
                explanation: 'A REIT (Real Estate Investment Trust) is a company that owns, operates, or finances income-producing real estate, allowing investors to earn dividends from real estate investments without having to buy, manage, or finance properties themselves.'
              }
            ],
            reward: {
              xp: 200
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 200
        },
        {
          id: 9,
          title: 'FIRE Movement',
          description: 'Learn about Financial Independence, Retire Early strategies and mindsets.',
          status: 'locked',
          icon: Flame,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'fire.mp3',
            text: 'The FIRE (Financial Independence, Retire Early) movement focuses on aggressive saving and investing to achieve financial freedom sooner than traditional retirement age. The core principle is simple: increase your savings rate dramatically by increasing income and reducing expenses, then invest the difference in low-cost index funds or other assets that generate passive income. There are several FIRE variations: Traditional FIRE typically aims for 25x annual expenses saved (based on the 4% safe withdrawal rule); Lean FIRE focuses on minimalism with lower target amounts; Fat FIRE seeks higher savings to maintain more luxurious lifestyles; and Coast FIRE involves saving enough early so that even without additional contributions, your investments will grow to support retirement at a traditional age. The FIRE journey requires tracking your savings rate, net worth, and financial independence number (25-30x your annual expenses). While the math is straightforward, the psychological aspects are challenging—balancing present enjoyment with future goals, maintaining motivation during market downturns, and redefining purpose beyond traditional work. Even if full early retirement isn\'t your goal, FIRE principles can help create more financial options and freedom in your life.',
            playbackSpeed: 1,
            infographic: 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&q=80&w=800&h=400'
          },
          quiz: {
            id: 'quiz-9',
            title: 'FIRE Movement Fundamentals',
            description: 'Test your knowledge about financial independence strategies',
            questions: [
              {
                id: 'q9-1',
                question: 'What does the acronym FIRE stand for?',
                options: [
                  'Financial Investment Return Expectations',
                  'Frugal Income Retirement Earnings',
                  'Financial Independence, Retire Early',
                  'Future Investment Risk Evaluation'
                ],
                correctAnswer: 2,
                explanation: 'FIRE stands for Financial Independence, Retire Early, which is a movement focused on saving and investing aggressively to achieve financial freedom and the option to retire much earlier than traditional retirement age.'
              },
              {
                id: 'q9-2',
                question: 'What is the 4% rule in FIRE planning?',
                options: [
                  'Withdrawing 4% of your initial retirement portfolio annually, adjusted for inflation',
                  'Saving 4% of your income for retirement',
                  'Earning a guaranteed 4% return on investments',
                  'Reducing expenses by 4% each year'
                ],
                correctAnswer: 0,
                explanation: 'The 4% rule suggests that you can withdraw 4% of your initial retirement portfolio value annually, adjusted for inflation, with a high probability that your money will last at least 30 years, based on historical market performance.'
              },
              {
                id: 'q9-3',
                question: 'What is Coast FIRE?',
                options: [
                  'Retiring to a coastal area',
                  'Having saved enough that your investments will grow to support traditional retirement without additional contributions',
                  'Working part-time jobs during retirement',
                  'Achieving FIRE through real estate investments'
                ],
                correctAnswer: 1,
                explanation: 'Coast FIRE means you\'ve saved enough money early in your career that, even without making any additional contributions, your investments will grow to support a traditional retirement age. This allows you to "coast" by only needing to cover your current expenses through work.'
              }
            ],
            reward: {
              xp: 200
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 200
        },
        {
          id: 10,
          title: 'Monetizing Passion Projects',
          description: 'Transform your interests into income streams through content creation and digital platforms.',
          status: 'locked',
          icon: DollarSign,
          progress: { current: 0, total: 3 },
          content: {
            podcast: 'passion_projects.mp3',
            text: 'Turning your passions into income streams has never been more accessible. Content creation platforms like YouTube, TikTok, Instagram, and Twitch allow you to build audiences around your interests and monetize through various channels. Revenue sources include platform partner programs (ad revenue), brand sponsorships, affiliate marketing, merchandise, digital products, and community support through Patreon or Ko-fi. Success requires consistency, quality, and strategic platform selection based on your content type and target audience. Video content typically monetizes best on YouTube through ads and sponsorships; short-form video can build audiences quickly on TikTok before directing them to monetized platforms; Instagram works well for visual content and influencer marketing; and Twitch specializes in live streaming. Beyond social platforms, consider creating digital products like courses, ebooks, templates, or apps related to your expertise. Marketplace platforms like Etsy, Teachable, or Gumroad simplify selling. Remember that monetization takes time—focus first on creating genuine value and building an engaged audience. Track metrics like engagement rates and conversion rates, not just follower counts. Most importantly, choose passion projects you\'ll enjoy even before they become profitable, as authentic enthusiasm is what ultimately attracts and retains an audience.',
            playbackSpeed: 1,
            video: '/videos/passion_projects.mp4'
          },
          quiz: {
            id: 'quiz-10',
            title: 'Content Creation & Monetization',
            description: 'Test your knowledge about turning passions into income',
            questions: [
              {
                id: 'q10-1',
                question: 'Which of these is typically NOT a way to monetize content creation?',
                options: [
                  'Brand sponsorships',
                  'Platform ad revenue',
                  'Guaranteed minimum wage payments',
                  'Digital product sales'
                ],
                correctAnswer: 2,
                explanation: 'Content creation platforms do not provide guaranteed minimum wage payments. Income is variable and performance-based, coming from sources like ad revenue, sponsorships, product sales, and audience support.'
              },
              {
                id: 'q10-2',
                question: 'What is affiliate marketing?',
                options: [
                  'Creating fake partnerships with brands',
                  'Earning commissions by promoting others\' products with tracked links',
                  'Paying for advertisements on social media',
                  'Hiring marketing agencies to promote your content'
                ],
                correctAnswer: 1,
                explanation: 'Affiliate marketing involves promoting other companies\' products or services using special tracked links, and earning a commission when your audience makes purchases through those links.'
              },
              {
                id: 'q10-3',
                question: 'What\'s generally more important for successful content monetization?',
                options: [
                  'Having millions of followers',
                  'Creating viral content regularly',
                  'Building an engaged audience that trusts you',
                  'Posting on as many platforms as possible'
                ],
                correctAnswer: 2,
                explanation: 'Building an engaged audience that trusts you is more valuable for monetization than raw follower numbers. An engaged, loyal audience is more likely to support you through purchases, memberships, and responding to sponsored content.'
              }
            ],
            reward: {
              xp: 250,
              badge: 'Wise Whiskers'
            }
          },
          votes: {
            up: 0,
            down: 0
          },
          comments: [],
          xp: 250
        }
      ],
      unlockRequirement: 5
    }
  },
  totalProgress: {
    completed: 1,
    total: 10
  },
  userProgress: {
    xp: 100,
    streak: 3,
    lastCompleted: '2025-02-22'
  },
  leaderboard: [
    {
      id: 'user1',
      name: 'CryptoQueen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      xp: 1250,
      streak: 14
    },
    {
      id: 'user2',
      name: 'InvestorPro',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
      xp: 980,
      streak: 8
    },
    {
      id: 'user3',
      name: 'BudgetMaster',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
      xp: 875,
      streak: 12
    },
    {
      id: 'user4',
      name: 'SavingsStar',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      xp: 720,
      streak: 5
    },
    {
      id: 'user5',
      name: 'MoneyMindful',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      xp: 650,
      streak: 7
    }
  ],
  dailyChallenges: [
    {
      id: 'dc1',
      title: 'Track Your Spending',
      description: 'Record every expense you make today, no matter how small.',
      xp: 20,
      completed: false
    },
    {
      id: 'dc2',
      title: 'No-Spend Challenge',
      description: 'Go the entire day without making any non-essential purchases.',
      xp: 30,
      completed: false
    },
    {
      id: 'dc3',
      title: 'Subscription Audit',
      description: 'Review all your subscriptions and cancel any you don\'t use regularly.',
      xp: 25,
      completed: true
    }
  ]
};