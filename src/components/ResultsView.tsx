"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface QuestionData {
  id: string;
  number: string;
  text: string;
  marks: string; // e.g., "2/2"
  feedback?: string;
  boundingBoxes?: { ymin: number, xmin: number, ymax: number, xmax: number, page: number }[];
}

interface ResultsViewProps {
  data: {
    questions: QuestionData[];
  } | null;
  answerSheetFile: File | null;
}

export function ResultsView({ data, answerSheetFile }: ResultsViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data?.questions[0]?.id || null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  
  // Create object URL for the PDF
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (answerSheetFile) {
      const url = URL.createObjectURL(answerSheetFile);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [answerSheetFile]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const selectedQuestion = data?.questions.find(q => q.id === expandedId);

  // Fallback mock data if API wasn't actually called for testing layout
  const displayData = data?.questions || [
    { id: "1", number: "1", text: "Which blood vessel carries blood away from the heart?", marks: "2/2", boundingBoxes: [{ ymin: 10, xmin: 10, ymax: 20, xmax: 90, page: 1 }] },
    { id: "2", number: "2", text: "Which of the following organelles is primarily involved in photosynthesis?", marks: "2/2", feedback: "Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!", boundingBoxes: [{ ymin: 45, xmin: 5, ymax: 60, xmax: 95, page: 1 }] },
    { id: "3", number: "3", text: "Explain the role of chloroplasts in photosynthesis...", marks: "2/2", boundingBoxes: [{ ymin: 65, xmin: 5, ymax: 80, xmax: 95, page: 1 }] },
    { id: "4", number: "4", text: "Describe the flow of blood...", marks: "0/2", boundingBoxes: [] }
  ];

  return (
    <div className="flex h-full w-full">
      {/* Left Pane: Questions */}
      <div className="w-1/2 border-r border-gray-100 flex flex-col h-full bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="font-semibold text-gray-800">Extracted Questions <span className="font-normal text-gray-500 text-sm">(from question paper)</span></h2>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Expand All</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
          {displayData.map((q) => {
            const isExpanded = expandedId === q.id;
            const isFullyCorrect = q.marks.split('/')[0] === q.marks.split('/')[1] && q.marks.split('/')[1] !== "0";
            
            return (
              <div 
                key={q.id} 
                className={`bg-white rounded-xl border transition-all cursor-pointer ${
                  isExpanded ? 'border-orange-400 shadow-md ring-1 ring-orange-400 ring-opacity-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
              >
                <div className="p-4 flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isExpanded ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {q.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <p className={`text-sm ${isExpanded ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{q.text}</p>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`font-bold text-sm ${isFullyCorrect ? 'text-green-500' : 'text-orange-500'}`}>
                          {q.marks}
                        </span>
                        {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                    </div>
                    
                    {isExpanded && q.feedback && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-700 mb-1">AI Feedback</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{q.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Answer Sheet Viewer */}
      <div className="w-1/2 flex flex-col h-full bg-gray-900 relative">
        <div className="p-3 bg-gray-800 text-white flex justify-between items-center text-sm z-10 shadow-md">
          <span className="font-medium">Answer Sheet</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-700 rounded-md">
              <button className="p-1.5 hover:bg-gray-600 rounded-l-md transition-colors" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOut size={16} /></button>
              <span className="px-2 text-xs font-medium">{Math.round(scale * 100)}%</span>
              <button className="p-1.5 hover:bg-gray-600 rounded-r-md transition-colors" onClick={() => setScale(s => Math.min(3, s + 0.1))}><ZoomIn size={16} /></button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="p-1 hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs">Page {pageNumber} of {numPages || '-'}</span>
              <button 
                className="p-1 hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-gray-900 p-8 flex justify-center items-start">
          {fileUrl && answerSheetFile && answerSheetFile.type.includes('pdf') && (
            <div className="relative shadow-2xl">
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="text-white text-sm animate-pulse">Loading PDF...</div>
                }
                error={
                  <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded">Failed to load PDF. Please ensure the file is a valid PDF document.</div>
                }
              >
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
                
                {/* Highlight Overlay for PDF */}
                {selectedQuestion?.boundingBoxes?.filter(box => box.page === pageNumber).map((box, i) => (
                  <div 
                    key={i}
                    className="absolute border-2 border-green-500 bg-green-500/10 rounded-md transition-all duration-300 pointer-events-none"
                    style={{
                      top: `${box.ymin}%`,
                      left: `${box.xmin}%`,
                      height: `${box.ymax - box.ymin}%`,
                      width: `${box.xmax - box.xmin}%`,
                    }}
                  >
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      Q{selectedQuestion.number}
                    </div>
                  </div>
                ))}
              </Document>
            </div>
          )}
          
          {fileUrl && answerSheetFile && answerSheetFile.type.startsWith('image/') && (
            <div className="relative shadow-2xl bg-white" style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}>
              <img 
                src={fileUrl} 
                alt="Answer Sheet" 
                className="max-w-full h-auto block"
                onLoad={() => setNumPages(1)}
              />
              
              {/* Highlight Overlay for Image */}
              {selectedQuestion?.boundingBoxes?.map((box, i) => (
                <div 
                  key={i}
                  className="absolute border-2 border-green-500 bg-green-500/10 rounded-md transition-all duration-300 pointer-events-none"
                  style={{
                    top: `${box.ymin}%`,
                    left: `${box.xmin}%`,
                    height: `${box.ymax - box.ymin}%`,
                    width: `${box.xmax - box.xmin}%`,
                  }}
                >
                  <div className="absolute -top-3 -left-3 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                    Q{selectedQuestion.number}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!fileUrl && (
             <div className="text-gray-500 text-sm mt-20">No file selected to display</div>
          )}
        </div>
      </div>
    </div>
  );
}
