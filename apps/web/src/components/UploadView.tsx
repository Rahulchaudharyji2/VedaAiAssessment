import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File as FileIcon, X, ArrowRight } from "lucide-react";

interface UploadViewProps {
  questionPaper: File | null;
  setQuestionPaper: (file: File | null) => void;
  answerSheet: File | null;
  setAnswerSheet: (file: File | null) => void;
  onStartMapping: () => void;
}

export function UploadView({
  questionPaper,
  setQuestionPaper,
  answerSheet,
  setAnswerSheet,
  onStartMapping,
}: UploadViewProps) {
  const isReady = questionPaper !== null && answerSheet !== null;

  return (
    <div className="flex flex-col items-center h-full p-2 md:p-4 lg:p-8 overflow-y-auto overflow-x-hidden">
      <div className="w-full flex flex-col items-center my-auto min-h-max py-4 md:py-6">
        <div className="text-center mb-4 md:mb-6 mt-2 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-gray-900">
          <span className="md:hidden">
            Upload Question Paper <br /> & Answer Sheets
          </span>
          <span className="hidden md:inline">
            Upload <span className="text-[#FF5623] bg-[#FF5623]/10 px-3 py-1 rounded-xl">Question Paper & Answer Sheets</span>
          </span>
        </h1>
        <p className="text-gray-500 text-sm hidden md:block">Upload both files to get started</p>
      </div>

        <div className="mb-4 md:mb-6 w-full flex justify-center">
          <img src="/upload-illustration.svg" alt="Upload illustration" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-3 w-full max-w-3xl mb-6 md:mb-8 bg-white md:bg-gray-100/80 p-4 md:p-3 rounded-[2rem] md:rounded-[2rem] shadow-sm md:shadow-none border border-transparent md:border-gray-200">
        <DropzoneBox 
          title="Question Paper"
          file={questionPaper}
          onDrop={(acceptedFiles) => setQuestionPaper(acceptedFiles[0])}
          onRemove={() => setQuestionPaper(null)}
        />
        <DropzoneBox 
          title="Answer Sheet"
          file={answerSheet}
          onDrop={(acceptedFiles) => setAnswerSheet(acceptedFiles[0])}
          onRemove={() => setAnswerSheet(null)}
        />
      </div>

      <div className="text-center pb-8 md:pb-0">
        <button
          onClick={onStartMapping}
          disabled={!isReady}
          className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-3 rounded-full font-medium transition-all mx-auto mb-4 ${
            isReady 
              ? "bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg" 
              : "bg-[#b8b8b8] md:bg-gray-200 text-white md:text-gray-400 cursor-not-allowed"
          }`}
        >
          Start Mapping <ArrowRight size={18} />
        </button>
        <p className="text-gray-400 text-xs md:text-sm max-w-[250px] md:max-w-none mx-auto leading-relaxed">
          Once both files are uploaded, you'll able to map answers with questions
        </p>
      </div>
      </div>
    </div>
  );
}

function DropzoneBox({ title, file, onDrop, onRemove }: { title: string, file: File | null, onDrop: (files: File[]) => void, onRemove: () => void }) {
  const onDropCallback = useCallback(onDrop, [onDrop]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
  });

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  };

  if (file) {
    return (
      <div className="flex-1 bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 relative flex items-center justify-center min-h-[140px]">
        <button 
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-gray-500 hover:bg-gray-700 text-white rounded-full transition-colors z-10"
        >
          <X size={14} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 text-red-500 rounded flex items-center justify-center font-bold text-xs uppercase">
             {file.type.includes('pdf') ? 'PDF' : 'IMG'}
          </div>
          <div>
            <p className="font-semibold text-sm truncate max-w-[180px]">{file.name}</p>
            <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      {...getRootProps()} 
      className={`flex-1 border-2 border-dashed rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[140px] bg-white ${
        isDragActive ? "border-orange-400" : "border-gray-200 hover:border-orange-300"
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
        <Upload className={`${isDragActive ? "text-orange-500" : "text-gray-600"}`} size={20} />
      </div>
      <p className="font-semibold text-sm md:text-base mb-1 text-gray-900">Upload <span className="text-orange-500">{title}</span></p>
      <p className="text-xs text-gray-400">Max 10MB</p>
    </div>
  );
}
