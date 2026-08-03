export default function HeroStats({ stats }) {
    return (
        <div className="flex gap-10 shrink-0">
            {stats.map((stat) => (
                <div key={stat.label}>
                    <div className="font-heading font-bold text-primary text-4xl md:text-5xl">
                        {stat.value}
                    </div>
                    <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}