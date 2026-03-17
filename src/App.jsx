import React, { useState } from 'react'

const App = () => {

  const [Heading, setHeading] = useState("")
  const [Note, setNote] = useState("")
  const [Tasks, setTasks] = useState([])
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener('scroll', checkScrollTop);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function SubmitForm() {
    console.log("Task Added", { "Heading": Heading, "Note": Note })

    let newTasks = [...Tasks]
    newTasks.push({ "Heading": Heading, "Note": Note })
    setTasks(newTasks);
    console.log(newTasks);
    setHeading("")
    setNote("")
  }

  return (
    <>
      <div className='min-h-screen bg-[#f8fafc] selection:bg-indigo-100 overflow-x-hidden selection:text-indigo-900 relative'>
        {/* Ambient Background Glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-200/30 blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[600px] rounded-full bg-gradient-to-tr from-peach-100/40 via-rose-100/30 to-transparent blur-[120px]"></div>
        </div>

        <section className='flex flex-col lg:flex-row min-h-screen relative z-10'>

          {/* LEFT SIDEBAR - Form Section */}
          <div className='lg:w-[430px] xl:w-[580px] h-screen p-6 md:p-10 flex flex-col justify-center bg-white/70 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-200/60 relative lg:sticky lg:top-0 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.03)]'>
            <div className='max-w-md w-full mx-auto'>
              <div className='mb-10 text-center lg:text-left'>
                <div className='inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-500 text-[10px] font-bold uppercase tracking-widest mb-4 border border-indigo-100'>
                  Productivity Suite
                </div>
                <h1 className='text-4xl font-black text-slate-900 tracking-tight'>
                  Task<span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600'>Flow</span>
                </h1>
                <p className='text-slate-500 mt-2 text-sm font-medium italic'>
                  "Design your day, master your craft."
                </p>
              </div>

              <form
                className='space-y-6'
                onSubmit={(e) => { e.preventDefault(); SubmitForm(); }}
              >
                <div className="group">
                  <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors'>Task Title</label>
                  <input
                    type="text"
                    placeholder='Enter task name...'
                    value={Heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className='w-full mt-2 px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 font-medium'
                  />
                </div>
                <div className="group">
                  <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-indigo-500 transition-colors'>Description</label>
                  <textarea
                    rows={3}
                    placeholder='What are the details?'
                    value={Note}
                    onChange={(e) => setNote(e.target.value)}
                    className='w-full mt-2 px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all resize-none placeholder:text-slate-300 font-medium'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-violet-600 text-white font-bold tracking-wide shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2'
                >
                  <span className="text-xl">+</span> Add New Task
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT CONTENT - Tasks Display */}
          <div className='flex-1 p-6 md:p-10 lg:p-16 h-screen'>
            <div className='max-w-6xl mx-auto'>
              <div className='flex items-end justify-between mb-12'>
                <div>
                  <h2 className='text-3xl font-black text-slate-900 tracking-tight'>Workspace</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Review your daily progress</p>
                </div>
                <div className='px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-3'>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className='text-xs font-bold text-slate-600 tracking-wider'>
                    {Tasks.length} {Tasks.length === 1 ? 'TASK' : 'TASKS'}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {Tasks.length > 0 ? (
                  Tasks.map((task, id) => (
                    <div
                      key={id}
                      className='relative group p-8 rounded-[2.5rem] bg-white/60 backdrop-blur-sm border border-white hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]'
                    >
                      <div className='relative z-10 flex flex-col h-full'>
                        <div className='flex justify-between items-start mb-6'>
                          <span className='text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest'>
                            ID: 0{id + 1}
                          </span>
                          <div className='p-1.5 rounded-lg bg-indigo-50 text-indigo-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>

                        <h3 className='text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors'>
                          {task.Heading}
                        </h3>
                        <p className='text-slate-500 text-[15px] leading-relaxed mb-8 flex-1 font-medium italic opacity-80'>
                          "{task.Note}"
                        </p>

                        <div className='pt-6 border-t border-slate-100 flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400'></span>
                            <span className='text-[11px] font-black text-slate-400 uppercase tracking-tighter'>High Priority</span>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='col-span-full py-32 text-center rounded-[3rem] bg-white/40 border-2 border-dashed border-slate-200'>
                    <div className='w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <span className='text-4xl'>☁️</span>
                    </div>
                    <p className='text-slate-400 text-lg font-bold'>No tasks for today. Relax!</p>
                  </div>
                )}
              </div>
              {/* SCROLL TO TOP BUTTON */}
              <button
                onClick={scrollTop}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-slate-200 text-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.2)] transition-all duration-500 hover:-translate-y-2 active:scale-90 group ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
              >
                <div className="relative">
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App