import {
  Pizza,  IceCream,  Utensils,  Music,  Brain,  Sparkles,  Puzzle,  Globe,  Sword,  Search,
  Plane,  Scissors,  PenTool,  Sun,  Moon,  Leaf,  Headphones,  Car,  Home,
  Compass,  PartyPopper,   Book,  Mic,  Coffee,  Bed,  Phone,  Wand,
  Shield,  Crown,  Rocket, Smile,  Hourglass,
  RefreshCcw,  Meh,  Laugh,
  Heart
} from 'lucide-react';

export const questions = [
  {
    id: 'comfort-food',
    question: 'What’s your go-to comfort food?',
    options: [
      { value: 'pizza', label: 'Pizza', icon: Pizza },
      { value: 'ice-cream', label: 'Ice Cream', icon: IceCream },
      { value: 'pasta', label: 'Noodles/Pasta', icon: Utensils },
      { value: 'snacks', label: 'Chips & Snacks', icon: Utensils }
    ]
  },
  {
    id: 'hidden-talent',
    question: 'Which hidden talent fits you best?',
    options: [
      { value: 'singing', label: 'Singing in the Shower', icon: Music },
      { value: 'trivia', label: 'Random Facts Master', icon: Brain },
      { value: 'dancing', label: 'Secret Dancer', icon: Sparkles },
      { value: 'puzzles', label: 'Puzzle Solver', icon: Puzzle }
    ]
  },
  {
    id: 'new-language',
    question: 'If you could wake up fluent in a new language, which one?',
    options: [
      { value: 'spanish', label: 'Spanish', icon: Globe },
      { value: 'french', label: 'French', icon: Globe },
      { value: 'japanese', label: 'Japanese', icon: Globe },
      { value: 'arabic', label: 'Arabic', icon: Globe }
    ]
  },
  {
    id: 'movie-vibe',
    question: 'Which movie vibe do you love rewatching?',
    options: [
      { value: 'rom-com', label: 'Romantic Comedy', icon: Heart },
      { value: 'action', label: 'Action & Adventure', icon: Sword },
      { value: 'animated', label: 'Animated & Feel-Good', icon: Sparkles },
      { value: 'thriller', label: 'Thriller/Mystery', icon: Search }
    ]
  },
  {
    id: 'spontaneous',
    question: 'What’s the most spontaneous thing you’d do?',
    options: [
      { value: 'trip', label: 'Last-Minute Trip', icon: Plane },
      { value: 'hairstyle', label: 'Wild New Hairstyle', icon: Scissors },
      { value: 'skydiving', label: 'Skydiving', icon: Plane },
      { value: 'tattoo', label: 'Get a Tattoo', icon: PenTool }
    ]
  },
  {
    id: 'sun',
    question: 'Which do you love more?',
    options: [
      { value: 'sunrise', label: 'Sunrise', icon: Sun },
      { value: 'sunset', label: 'Sunset', icon: Moon },
      { value: 'both', label: 'Both!', icon: Sparkles },
      { value: 'night-owl', label: 'Night Owl', icon: Leaf }
    ]
  },
  {
    id: 'mood-song',
    question: 'Pick a mood-booster song style:',
    options: [
      { value: 'pop', label: 'Pop Hits', icon: Music },
      { value: 'classics', label: 'Old-School Classics', icon: Music },
      { value: 'indie', label: 'Chill Indie Vibes', icon: Leaf },
      { value: 'edm', label: 'Dance/EDM', icon: Headphones }
    ]
  },
  {
    id: 'weekend',
    question: 'Your perfect weekend would be:',
    options: [
      { value: 'road-trip', label: 'Road Trip with Friends', icon: Car },
      { value: 'cozy-home', label: 'Cozy at Home', icon: Home },
      { value: 'solo-explore', label: 'Solo Exploring', icon: Compass },
      { value: 'party', label: 'Party/Festival', icon: PartyPopper }
    ]
  },
  {
    id: 'bucket-list',
    question: 'What’s one thing on your bucket list?',
    options: [
      { value: 'travel-world', label: 'Visit Every Continent', icon: Globe },
      { value: 'extreme-sport', label: 'Learn Extreme Sport', icon: Sword },
      { value: 'write-book', label: 'Write a Book/Blog', icon: Book },
      { value: 'perform', label: 'Perform on Stage', icon: Mic }
    ]
  },
  {
    id: 'instant-happy',
    question: 'What instantly makes your day better?',
    options: [
      { value: 'coffee', label: 'Coffee or Tea', icon: Coffee },
      { value: 'nap', label: 'A Good Nap', icon: Bed },
      { value: 'call', label: 'Talking to Someone', icon: Phone },
      { value: 'music', label: 'Listening to Music', icon: Music }
    ]
  },
  {
    id: 'fictional-life',
    question: 'Which fictional life would you live for a day?',
    options: [
      { value: 'wizard', label: 'Wizard at Hogwarts', icon: Wand },
      { value: 'superhero', label: 'Superhero', icon: Shield },
      { value: 'royalty', label: 'Fantasy Royalty', icon: Crown },
      { value: 'space', label: 'Space Explorer', icon: Rocket }
    ]
  },
  {
    id: 'time-travel',
    question: 'If you could time travel, you’d go:',
    options: [
      { value: 'past', label: 'Way Back in History', icon: Hourglass },
      { value: 'future', label: 'Distant Future', icon: Rocket },
      { value: 'personal', label: 'Fix a Personal Moment', icon: RefreshCcw },
      { value: 'now', label: 'Stay Right Here', icon: Heart }
    ]
  },
  {
    id: 'misunderstood',
    question: 'People often misunderstand you as:',
    options: [
      { value: 'shy', label: 'Shy but Chill', icon: Meh },
      { value: 'outgoing', label: 'Outgoing but Deep', icon: Smile },
      { value: 'serious', label: 'Serious but Funny', icon: Laugh },
      { value: 'quiet', label: 'Quiet but Adventurous', icon: Compass }
    ]
  }
];
