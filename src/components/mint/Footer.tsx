const Footer =() =>
(<footer className="bg-black text-white py-8 mt-16">
    <div className="max-w-7xl mx-auto px-8">
        <div className="text-center space-y-4">
            <div className="text-2xl font-black">ZORA-CHAN CHARACTER COINS</div>
            <div className="text-sm font-bold text-gray-400">
                Built with Zora SDK • Deployed on Base • Powered by IPFS
            </div>
            <div className="flex justify-center space-x-8 text-sm font-bold">
                <a href="https://zora.co" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                    Zora Protocol
                </a>
                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                    Base Network
                </a>
                <a href="https://ipfs.io" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                    IPFS
                </a>
            </div>
        </div>
    </div>
</footer>);
export default Footer;