
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, MessageSquare, Brain, Upload, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import DocumentUpload from "@/components/DocumentUpload";
import ResearchChat from "@/components/ResearchChat";
import SearchInterface from "@/components/SearchInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ResearchAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#upload" className="text-gray-600 hover:text-blue-600 transition-colors">Upload</a>
              <a href="#chat" className="text-gray-600 hover:text-blue-600 transition-colors">Chat</a>
              <a href="#search" className="text-gray-600 hover:text-blue-600 transition-colors">Search</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Research Tools at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform how you conduct research with AI-powered document analysis, 
              intelligent Q&A, and comprehensive search capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload className="h-8 w-8" />}
              title="Document Upload & Analysis"
              description="Upload PDFs, research papers, and documents. Our AI extracts key information and makes it searchable."
              color="blue"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Intelligent Q&A"
              description="Ask questions about your documents in natural language. Get precise answers with source citations."
              color="indigo"
            />
            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="Advanced Search"
              description="Search across all your documents, websites, and databases with semantic understanding."
              color="purple"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Paper Explanation"
              description="Get clear explanations of complex research papers, breaking down methodology and findings."
              color="cyan"
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Insights"
              description="Discover connections between documents and generate research insights automatically."
              color="teal"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Fast & Accurate"
              description="Get instant responses with high accuracy, powered by state-of-the-art language models."
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Documents</h2>
            <p className="text-xl text-gray-600">
              Start by uploading your research papers, PDFs, or any documents you want to analyze
            </p>
          </div>
          <DocumentUpload />
        </div>
      </section>

      {/* Chat Interface Section */}
      <section id="chat" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask Questions</h2>
            <p className="text-xl text-gray-600">
              Chat with your documents and get intelligent answers to your research questions
            </p>
          </div>
          <ResearchChat />
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Search</h2>
            <p className="text-xl text-gray-600">
              Search across all your documents with AI-powered semantic understanding
            </p>
          </div>
          <SearchInterface />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">ResearchAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students and professionals with AI-driven research tools
            </p>
            <p className="text-sm text-gray-500">
              © 2024 ResearchAI. Built with advanced AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
