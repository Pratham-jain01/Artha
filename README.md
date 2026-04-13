# Artha 🪷
> A premium, high-performance AI language translator and dictionary companion.

Artha is a beautifully designed web application built to help you explore the nuances of the English, Hindi, and Marathi languages. Powered by the incredibly fast **Groq** API and Llama 3.3, Artha delivers instant phonetic breakdowns, contextual meanings, and detailed grammatical explanations for both words and full sentences.

![Artha Header Image/Mockup placeholder](https://via.placeholder.com/800x400?text=Artha+AI+Dictionary)

## ✨ Features
- **Deep Lexicon AI:** Distinguishes between single words and full sentences automatically.
- **Micro-Animations:** Beautiful, seamless UI transitions powered by **Framer Motion**.
- **Glassmorphism Design:** A stunning dark-mode aesthetic with custom border-glows utilizing **Tailwind CSS**.
- **Text-to-Speech:** Built-in `window.speechSynthesis` for listening to English pronunciations.
- **Copy-to-Clipboard:** Instantly copy your translations to clipboard for studying or texting later.
- **High-Performance:** Uses the Next.js 14 App Router and Groq's high-speed inference engine.

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **AI Backend:** Groq SDK (Model: Llama-3.3-70b-versatile)
- **Fonts:** Playfair Display & Inter (Google Fonts)

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/artha.git
   cd artha
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Groq API Key:
   ```env
   GROQ_API_KEY=gsk_your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ☁️ Deployment (Vercel)
Artha is fully optimized to be deployed on **Vercel**. 
1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and Import your repository.
3. In the environment variables section on Vercel, make sure to add `GROQ_API_KEY` and paste your key.
4. Click Deploy! Wait 1 minute, and your site is live.

## 🔮 Future Roadmap (Ideas & Contributions)
- **Search History & Caching:** Remembering user's past queries via local storage.
- **Favorites (Starred Words):** A feature to save difficult words into a personal learning deck.
- **Synonyms/Antonyms:** Enhancing the AI prompt to return related vocabulary.
- **Voice Dictation (Speech-to-Text):** Allowing users to speak their questions instead of typing.

---
*Built with ❤️ utilizing Next.js & Groq.*
