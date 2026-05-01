import React, { useState, useEffect } from 'react'

const App = () => {

  const [Heading, setHeading] = useState("")
  const [Note, setNote] = useState("")
  const [Tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [showScroll, setShowScroll] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(Tasks))
  }, [Tasks])

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
    if (!Heading.trim()) return;
    console.log("Task Added", { "Heading": Heading, "Note": Note })

    let newTasks = [...Tasks]
    const nextId = Tasks.length > 0 ? Math.max(...Tasks.map(t => t.id || 0)) + 1 : 1
    newTasks.unshift({ id: nextId, Heading: Heading, Note: Note })
    setTasks(newTasks);
    setHeading("")
    setNote("")
  }

  function DeleteTask(index) {
    const newTasks = [...Tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <>
      <div className='min-h-screen bg-[#f8fafc] dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden relative transition-colors duration-500'>
        {/* Ambient Background Glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-200/30 dark:from-indigo-900/20 dark:to-purple-900/20 blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[600px] rounded-full bg-gradient-to-tr from-peach-100/40 via-rose-100/30 to-transparent dark:from-slate-900/40 dark:via-indigo-950/30 blur-[120px]"></div>
        </div>

        <section className='flex flex-col lg:flex-row min-h-screen relative z-10'>

          {/* LEFT SIDEBAR - Form Section */}
          <div className='lg:w-[430px] xl:w-[580px] h-screen p-6 md:p-10 flex flex-col justify-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-slate-800/60 relative lg:sticky lg:top-0 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-500'>
            <div className='max-w-md w-full mx-auto'>
              <div className='mb-10 text-center lg:text-left'>
                <div className='inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-indigo-100 dark:border-indigo-800/50'>
                  Productivity Suite
                </div>
                <div className='flex items-center justify-center lg:justify-between gap-4'>
                  <h1 className='text-4xl font-black text-slate-900 dark:text-white tracking-tight'>
                    Task<span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600'>Flow</span>
                  </h1>

                  {/* Theme Toggle */}
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all active:scale-95 group"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {isDark ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className='text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium italic'>
                  "Design your day, master your craft."
                </p>
              </div>

              <form
                className='space-y-6'
                onSubmit={(e) => { e.preventDefault(); SubmitForm(); }}
              >
                <div className="group">
                  <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 group-focus-within:text-indigo-500 transition-colors'>Task Title</label>
                  <input
                    type="text"
                    placeholder='Enter task name...'
                    value={Heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className='w-full mt-2 px-5 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium'
                  />
                </div>
                <div className="group">
                  <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 group-focus-within:text-indigo-500 transition-colors'>Description</label>
                  <textarea
                    rows={3}
                    placeholder='What are the details?'
                    value={Note}
                    onChange={(e) => setNote(e.target.value)}
                    className='w-full mt-2 px-5 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 dark:focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-indigo-600 dark:to-violet-700 hover:from-indigo-600 hover:to-violet-600 dark:hover:from-indigo-500 dark:hover:to-violet-500 text-white font-bold tracking-wide shadow-lg shadow-indigo-200 dark:shadow-indigo-950/20 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2'
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
                  <h2 className='text-3xl font-black text-slate-900 dark:text-white tracking-tight'>Workspace</h2>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">Review your daily progress</p>
                </div>
                <div className='px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 transition-colors duration-500'>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className='text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider'>
                    {Tasks.length} {Tasks.length === 1 ? 'TASK' : 'TASKS'}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {Tasks.length > 0 ? (
                  Tasks.map((task, id) => (
                    <div
                      key={id}
                      className='relative group p-8 rounded-[2.5rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)]'
                    >
                      <div className='relative z-10 flex flex-col h-full'>
                        <div className='flex justify-between items-start mb-6'>
                          <span className='text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-widest'>
                            ID: {task.id < 10 ? `0${task.id}` : task.id}
                          </span>
                          <div className='flex gap-2'>
                            <div className='p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-500 dark:text-indigo-400'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <button
                              onClick={() => DeleteTask(id)}
                              className='p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors'
                              title="Delete Task"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
                          {task.Heading}
                        </h3>
                        <p className='text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8 flex-1 font-medium italic opacity-80'>
                          "{task.Note}"
                        </p>

                        <div className='pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400'></span>
                            <span className='text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter'>High Priority</span>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800"></div>
                            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 dark:bg-indigo-900/50"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='col-span-full py-32 text-center rounded-[3rem] bg-white/40 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-500'>
                    <div className='w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <span className='text-4xl'>☁️</span>
                    </div>
                    <p className='text-slate-400 dark:text-slate-500 text-lg font-bold'>No tasks for today. Relax!</p>
                  </div>
                )}
              </div>
              {/* SCROLL TO TOP BUTTON */}
              <button
                onClick={scrollTop}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 shadow-[0_20px_50px_rgba(79,70,229,0.2)] transition-all duration-500 hover:-translate-y-2 active:scale-90 group ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
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