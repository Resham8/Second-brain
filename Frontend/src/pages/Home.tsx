import {
  BookmarkCheck,
  BookOpen,
  BrainCircuit,
  Heart,
  Notebook,
  Pen,
  Star,
  Zap,
} from "lucide-react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-blue-400/10 z-0" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      <div className="relative z-10 flex flex-col">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-64px)] px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="relative group w-80 md:w-96">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/20 to-blue-400/30 rounded-full blur-2xl scale-150 opacity-60 animate-pulse" />

              <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-400 rounded-full opacity-75 animate-bounce delay-100 flex items-center justify-center text-white">
                <Star size={14} />
              </div>

              <div className="absolute -top-4 right-8 w-6 h-6 bg-pink-400 rounded-full opacity-75 animate-bounce delay-300 flex items-center justify-center text-white">
                <Notebook size={14} />
              </div>

              <div className="absolute top-6 -right-6 w-6 h-6 bg-blue-400 rounded-full opacity-75 animate-bounce delay-500 flex items-center justify-center text-white">
                <BrainCircuit size={16} />
              </div>

              <div className="absolute bottom-1 -left-5 w-6 h-6 bg-indigo-400 rounded-full opacity-75 animate-bounce delay-700 flex items-center justify-center text-white">
                <Pen size={18} />
              </div>

              <div className="absolute bottom-3 right-5 w-6 h-6 bg-purple-500 rounded-full opacity-75 animate-bounce delay-900 flex items-center justify-center text-white">
                <BookmarkCheck size={12} />
              </div>

              <div className="absolute top-10 -left-7 w-6 h-6 bg-cyan-400 rounded-full opacity-75 animate-bounce delay-1100 flex items-center justify-center text-white">
                <BookOpen size={14} />
              </div>

              <div className="absolute top-2 right-2 w-6 h-6 bg-red-400 rounded-full opacity-75 animate-bounce delay-1300 flex items-center justify-center text-white">
                <Heart size={16} />
              </div>

              <div className="absolute bottom-5 left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-75 animate-bounce delay-1500 flex items-center justify-center text-white">
                <Zap size={16} />
              </div>

              <img
                src="/second-brain-logo.png"
                alt="Hero graphic"
                className="relative w-full drop-shadow-2xl filter brightness-110 contrast-105 transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center text-center md:text-left gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                Second Brain
              </span>
            </h1>
            <p className="text-gray-600 font-medium text-lg md:text-xl lg:text-2xl leading-relaxed max-w-lg">
              Capture, organize, and share your ideas with the most beautiful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
                knowledge management platform
              </span>{" "}
              ever built.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to={"/signup"}>
                <Button
                  variant="primary"
                  text="Get Started"
                  fullWidth={false}
                />
              </Link>
              <Link to={"/signin"}>
                <Button variant="secondary" text="Sign In" fullWidth={false} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
