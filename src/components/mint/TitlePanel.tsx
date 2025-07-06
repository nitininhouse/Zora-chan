const TitlePanel = () => (
    <div className="bg-white border-4 border-black p-8 transform -rotate-1 shadow-2xl">
        <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 font-black text-lg">
            CHAPTER 1
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">
            <span
                style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    textShadow: '4px 4px 0px #000',
                    WebkitTextStroke: '2px #000',
                    color: 'white'
                }}
            >
                CREATE YOUR CHARACTER COIN
            </span>
        </h1>
        <div className="text-xl text-gray-600 font-bold">キャラクターコインを作成</div>
    </div >);

    export default TitlePanel;
