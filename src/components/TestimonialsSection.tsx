'use client';

import { MdStar, MdStarHalf, MdStarBorder, MdFormatQuote } from 'react-icons/md';

const testimonials = [
  {
    quote: "This system has revolutionized how we manage our pharmacy. The inventory tracking is incredibly efficient and has saved us countless hours. The automated alerts have prevented stockouts multiple times.",
    author: "Dr. Sarah Johnson",
    role: "Pharmacy Owner",
    image: "https://i.pravatar.cc/150?img=1",
    company: "MediCare Pharmacy",
    rating: 5,
    location: "New York, USA",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    quote: "The patient management features have streamlined our workflow significantly. The automated alerts and prescription tracking are game-changers. We've seen a 40% reduction in prescription processing time.",
    author: "Michael Chen",
    role: "Pharmacy Manager",
    image: "https://i.pravatar.cc/150?img=2",
    company: "HealthPlus Pharmacy",
    rating: 5,
    location: "San Francisco, USA",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    quote: "The analytics dashboard gives us valuable insights into our business performance. We've seen a 30% increase in efficiency since implementation. The reporting features are particularly impressive.",
    author: "Emily Rodriguez",
    role: "Pharmacy Director",
    image: "https://i.pravatar.cc/150?img=3",
    company: "Wellness Pharmacy",
    rating: 5,
    location: "Chicago, USA",
    color: "from-green-500/20 to-green-600/20"
  }
];

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < Math.floor(rating)) {
          return <MdStar key={i} className="w-4 h-4 text-yellow-400" />;
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
          return <MdStarHalf key={i} className="w-4 h-4 text-yellow-400" />;
        } else {
          return <MdStarBorder key={i} className="w-4 h-4 text-white/40" />;
        }
      })}
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading pharmacies worldwide to streamline their operations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
              <div className="relative glass-card glass-card-hover rounded-xl p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <MdFormatQuote className="w-8 h-8 text-white/20 mb-4" />
                    <Rating rating={testimonial.rating} />
                    <p className="text-lg mb-6 mt-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full ring-2 ring-white/20"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-white/80">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      <p className="text-xs text-white/60">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 