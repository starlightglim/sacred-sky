const EmailForm = () => {
    return (
      <form className="flex flex-col gap-3 max-w-xs w-full mx-auto pointer-events-auto opacity-0 animate-fade-in-delay-2 my-8">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-5 py-4 bg-white/10 rounded-full text-sm tracking-wider border border-white/20 backdrop-blur-lg text-center placeholder:text-center"
          required
        />
        <button
          type="submit"
          className="w-full px-8 py-4 bg-black/70 text-white rounded-full text-sm uppercase tracking-wider border border-white/10"
        >
          Notify Me
        </button>
      </form>
    );
  };
  
  export default EmailForm;