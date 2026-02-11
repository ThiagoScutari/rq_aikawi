import React, { useState, useRef } from 'react';
import { ACTIVITIES, COMPANIES, MOCK_LOGS } from '../constants';

interface ActivityModalProps {
  activityId: string;
  companyId: string;
  month: number;
  onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ activityId, companyId, month, onClose }) => {
  const activity = ACTIVITIES.find(a => a.id === activityId)!;
  const company = COMPANIES.find(c => c.id === companyId)!;
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'CONCLUIDA' | 'PENDENTE' | 'ATRASADA'>('PENDENTE');
  const [attachments, setAttachments] = useState<File[]>([]);
  
  // Estados para gravação de áudio
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const history = [
    { user: 'João D.', date: '12 Abr, 2024 • 09:15', content: 'As guias do mês anterior estavam com valor divergente no sistema da prefeitura. Ajustado.' },
    { user: 'Maria C.', date: '10 Mar, 2024 • 14:30', content: 'Processo finalizado sem ressalvas após envio do extrato pelo cliente.' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  // Lógica de Gravação de Áudio
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], `gravacao-${new Date().getTime()}.wav`, { type: 'audio/wav' });
          setAttachments(prev => [...prev, audioFile]);
          stream.getTracks().forEach(track => track.stop()); // Libera o microfone
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        alert('Erro ao acessar microfone. Verifique as permissões.');
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* [AJUSTE] Container principal reduzido e mais compacto */}
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header Compacto */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center border border-primary-100">
              <span className="material-symbols-outlined text-2xl">edit_note</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight leading-tight">{activity.title}</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{company.name} • {months[month]} / 2024</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Coluna Esquerda - Registro */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registro de Execução</h3>
              
              {/* Box de Inputs Compacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase ml-1">Status</label>
                    <select 
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 shadow-sm transition-all h-10"
                    >
                      <option value="CONCLUIDA">Concluída</option>
                      <option value="PENDENTE">Pendente</option>
                      <option value="ATRASADA">Atrasada</option>
                    </select>
                 </div>
                 
                 <div className="flex items-end gap-2">
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple />
                    
                    <button 
                      onClick={() => fileInputRef.current?.click()} 
                      className="flex-1 bg-white border border-slate-300 h-10 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base text-primary-600">image</span>
                      Anexar
                    </button>
                    
                    {/* [AJUSTE] Botão de Gravação de Áudio */}
                    <button 
                      onClick={toggleRecording} 
                      className={`flex-1 border h-10 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold transition-all shadow-sm ${
                        isRecording 
                          ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                          : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{isRecording ? 'stop_circle' : 'mic'}</span>
                      {isRecording ? 'Parar' : 'Gravar'}
                    </button>
                 </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-600 uppercase ml-1">Notas e Observações</label>
                {/* [AJUSTE] Textarea maior e com fundo cinza para contraste */}
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-400 focus:bg-white placeholder:text-slate-400 shadow-inner leading-relaxed min-h-[160px] resize-y"
                  placeholder="Documente divergências, solicitações pendentes ou detalhes da apuração aqui..."
                />
              </div>

              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  {attachments.map((file, i) => (
                    <div key={i} className="bg-white text-slate-700 px-3 py-1.5 rounded border border-slate-200 text-[10px] font-bold flex items-center gap-2 shadow-sm">
                      <span className="material-symbols-outlined text-sm text-slate-400">
                        {file.type.includes('audio') ? 'mic' : 'image'}
                      </span>
                      <span className="truncate max-w-[120px]">{file.name}</span>
                      <button onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))} className="hover:text-red-500 flex items-center">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coluna Direita - Histórico Simplificado */}
          <div className="lg:col-span-2 space-y-4 border-l border-slate-100 lg:pl-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Histórico Recente</h3>
            
            <div className="space-y-4">
              {history.map((item, idx) => (
                // [AJUSTE] Remoção de bulletpoints e classificações
                <div key={idx} className="flex flex-col gap-1 pb-4 border-b border-slate-50 last:border-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-800">{item.user}</span>
                    <span className="text-[9px] font-medium text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Auditoria Compacta */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex gap-3 items-center mt-auto">
               <span className="material-symbols-outlined text-slate-400 text-lg">shield</span>
               <p className="text-[9px] text-slate-500 font-medium leading-tight">
                  Log auditado (ISO 27001).
               </p>
            </div>
          </div>
        </div>

        {/* Footer de Ações Ajustado */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
          
          {/* [AJUSTE] Botão Descartar Vermelho */}
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all"
          >
            Descartar
          </button>
          
          <div className="flex gap-3">
            {/* [AJUSTE] Botão Finalizar (Verde) */}
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm border border-emerald-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">save</span>
              Finalizar
            </button>

            {/* [AJUSTE] Botão Notificar (Amarelo/Âmbar) */}
            <button className="bg-amber-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-amber-600 transition-all shadow-sm border border-amber-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">send</span>
              Finalizar e Notificar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;