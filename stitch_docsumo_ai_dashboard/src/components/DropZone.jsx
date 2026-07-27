import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function DropZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only PDF and TXT files are supported.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size exceeds 50MB limit.');
      return;
    }
    setSelectedName(file.name);
    onFileSelect(file);
    toast.success(`Selected: ${file.name}`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div className="group relative cursor-pointer mb-8" onClick={handleClick}>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
      <div
        className={`relative flex flex-col items-center justify-center gap-3 md:gap-4 py-8 md:py-12 px-4 md:px-6 bg-surface-container-lowest/50 border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-outline-variant hover:border-primary'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface-variant/50 flex items-center justify-center transition-transform duration-300 ${
            isDragging ? 'scale-110' : 'group-hover:scale-110'
          }`}
        >
          <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">
            {selectedName ? 'description' : 'cloud_upload'}
          </span>
        </div>
        <div className="text-center">
          {selectedName ? (
            <>
              <p className="text-base font-body text-primary font-semibold">{selectedName}</p>
              <p className="text-sm font-body text-on-surface-variant mt-1">Click or drop to replace</p>
            </>
          ) : (
            <>
              <p className="text-base font-body text-on-surface font-semibold">
                Drop document here
              </p>
              <p className="text-sm font-body text-on-surface-variant mt-1">
                Supports PDF, TXT (Max 50MB)
              </p>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          className="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
