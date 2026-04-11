import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  // Admin
  const admin = await db.admin.create({
    data: {
      name: "Harshit Sharma",
      email: "harshit@gmail.com",
      password: await bcrypt.hash("123456", 10),
      events: {
        create: {
          eventName: "TechConf2024",
          eventDesc: "Annual technology conference for developers",
          message: "Thank you for attending! Please share your experience.",
          users: {
            create: [
              {
                name: "Rahul Verma",
                email: "rahul@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Absolutely mind-blowing sessions. The speakers were world class and the networking opportunities were incredible. Will definitely attend next year!",
                    stars: 5,
                  },
                },
              },
              {
                name: "Priya Singh",
                email: "priya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Great event overall. Loved the workshops.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Aman Gupta",
                email: "aman@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The Next.js and AI talks were phenomenal. Learned so much in just two days. Venue was top notch and food was great too.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Sneha Patel",
                email: "sneha@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Good but could have been better. Some sessions felt rushed.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Vikram Joshi",
                email: "vikram@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Best conference I have attended in years. The hands-on labs were amazing.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Ananya Roy",
                email: "ananya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Loved it!",
                    stars: 4,
                  },
                },
              },
              {
                name: "Karan Mehta",
                email: "karan@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The Docker and Kubernetes workshop alone was worth the ticket price. Incredibly well organized with clear takeaways for each session.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Divya Nair",
                email: "divya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Decent event. Expected more from the keynote.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Rohan Das",
                email: "rohan@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Met so many brilliant people. The community here is genuinely supportive and inspiring.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Rahul Verma",
                email: "rahul@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Absolutely mind-blowing sessions. The speakers were world class and the networking opportunities were incredible. Will definitely attend next year!",
                    stars: 5,
                  },
                },
              },
              {
                name: "Priya Singh",
                email: "priya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Great event overall. Loved the workshops.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Aman Gupta",
                email: "aman@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The Next.js and AI talks were phenomenal. Learned so much in just two days. Venue was top notch and food was great too. Would recommend to every developer I know.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Sneha Patel",
                email: "sneha@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Good but could have been better. Some sessions felt rushed.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Vikram Joshi",
                email: "vikram@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Best conference I have attended in years.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Ananya Roy",
                email: "ananya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Loved it! Super well organized. The after party was a bonus.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Karan Mehta",
                email: "karan@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The Docker and Kubernetes workshop alone was worth the ticket price. Incredibly well organized with clear takeaways for each session. The instructors were patient and knowledgeable.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Divya Nair",
                email: "divya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Decent event. Expected more from the keynote honestly.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Rohan Das",
                email: "rohan@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Met so many brilliant people. The community here is genuinely supportive and inspiring. Left with 3 job offers and 10 new friends.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Meera Iyer",
                email: "meera@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Outstanding!",
                    stars: 5,
                  },
                },
              },
              {
                name: "Arjun Kapoor",
                email: "arjun@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The Redis and caching deep dive was exactly what I needed. Practical, hands-on, and no fluff. Came back to my job and immediately optimized our entire backend.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Pooja Sharma",
                email: "pooja@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Really enjoyed the panel discussions. Would have liked more women speakers though.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Nikhil Bhat",
                email: "nikhil@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Solid event. Coffee could be better.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Sakshi Tiwari",
                email: "sakshi@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "I drove 400km to attend this and it was 100 percent worth it. The quality of content was unmatched. The speakers shared real experiences not just theory.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Dev Malhotra",
                email: "dev@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Very well organized. Smooth registration, great venue, excellent speakers.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Ishaan Chawla",
                email: "ishaan@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Good sessions but parking was a nightmare.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Tanya Mishra",
                email: "tanya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The startup pitch competition was the highlight. Saw the next generation of Indian tech founders in action. Truly inspiring afternoon.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Siddharth Rao",
                email: "sid@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Worth every rupee.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Kavya Reddy",
                email: "kavya@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Attended as a first year developer and felt completely welcome. The mentorship lounge was a brilliant idea. Got 1 on 1 time with senior engineers from top companies.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Harsh Agarwal",
                email: "harsh@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Good networking. Sessions were average.",
                    stars: 3,
                  },
                },
              },
              {
                name: "Nidhi Saxena",
                email: "nidhi@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Came for one talk, stayed for everything. The energy in that hall was electric.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Ritesh Kumar",
                email: "ritesh@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Phenomenal experience from start to finish. The swag bag alone was worth it.",
                    stars: 4,
                  },
                },
              },
              {
                name: "Simran Gill",
                email: "simran@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review: "Amazing.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Yash Trivedi",
                email: "yash@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "The AWS deployment workshop changed how I think about infrastructure. We deployed a full containerized app in under an hour. Mind blown.",
                    stars: 5,
                  },
                },
              },
              {
                name: "Aditi Bose",
                email: "aditi@gmail.com",
                reviews: {
                  create: {
                    eventName: "TechConf2024",
                    review:
                      "Really well curated schedule. No back to back boring talks. Good mix of technical depth and inspiration.",
                    stars: 4,
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
