import { useState, useEffect } from 'react';
import { profile } from '../../data/siteData';
import SectionHeading from '../ui/SectionHeading';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Precomputed fallback stats from MeetKadiya's GitHub profile
const DEFAULT_STATS = {
  repos: 19,
  followers: 5,
  following: 4,
  stars: 0,
  forks: 0,
  languages: [
    { name: 'Python', color: '#3572A5', count: 8, percent: 42.1 },
    { name: 'HTML', color: '#e34c26', count: 4, percent: 21.1 },
    { name: 'JavaScript', color: '#f1e05a', count: 2, percent: 10.5 },
    { name: 'Shell', color: '#89e051', count: 2, percent: 10.5 },
    { name: 'TypeScript', color: '#3178c6', count: 1, percent: 5.3 },
    { name: 'CSS', color: '#563d7c', count: 1, percent: 5.3 },
  ],
};

const LANGUAGE_COLORS = {
  Python: '#3572A5',
  HTML: '#e34c26',
  JavaScript: '#f1e05a',
  Shell: '#89e051',
  TypeScript: '#3178c6',
  CSS: '#563d7c',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
};

export default function GitHubSection() {
  const ref = useScrollReveal();
  const { githubUsername } = profile;
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [chartError, setChartError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`),
        ]);

        if (!isMounted) return;

        let reposCount = DEFAULT_STATS.repos;
        let followers = DEFAULT_STATS.followers;
        let following = DEFAULT_STATS.following;

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const userData = await userRes.value.json();
          reposCount = userData.public_repos ?? reposCount;
          followers = userData.followers ?? followers;
          following = userData.following ?? following;
        }

        let totalStars = 0;
        let totalForks = 0;
        const langCounts = {};

        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const reposData = await reposRes.value.json();
          if (Array.isArray(reposData)) {
            reposData.forEach((repo) => {
              totalStars += repo.stargazers_count || 0;
              totalForks += repo.forks_count || 0;
              if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
              }
            });

            const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
            if (totalLangRepos > 0) {
              const langsArray = Object.entries(langCounts)
                .map(([name, count]) => ({
                  name,
                  count,
                  percent: Number(((count / totalLangRepos) * 100).toFixed(1)),
                  color: LANGUAGE_COLORS[name] || '#8B93A7',
                }))
                .sort((a, b) => b.count - a.count);

              setStats({
                repos: reposCount,
                followers,
                following,
                stars: totalStars,
                forks: totalForks,
                languages: langsArray,
              });
              return;
            }
          }
        }

        setStats((prev) => ({
          ...prev,
          repos: reposCount,
          followers,
          following,
          stars: totalStars,
          forks: totalForks,
        }));
      } catch {
        // Silently preserve precomputed defaults on rate limits or network issues
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  return (
    <section id="github" className="py-20 md:py-28 scroll-mt-16" aria-label="GitHub activity">
      <div className="container-content">
        <div className="reveal" ref={ref}>
          <SectionHeading
            eyebrow="github"
            title="Commit history"
            description="A live look at recent activity and open-source metrics, pulled straight from GitHub."
          />

          {/* Contribution Chart */}
          <div className="mt-10 card p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gitgreen"
                >
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="12" x2="9" y2="12" />
                  <line x1="15" y1="12" x2="21" y2="12" />
                </svg>
                <span className="font-mono text-xs text-text font-medium uppercase tracking-wider">
                  Contribution Activity
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gitgreen">
                <span className="w-2 h-2 rounded-full bg-gitgreen animate-pulse"></span>
                Live on GitHub
              </span>
            </div>

            {!chartError ? (
              <img
                src={`https://ghchart.rshah.org/4F8CFF/${githubUsername}`}
                alt={`GitHub contribution graph for ${githubUsername}`}
                className="w-full min-w-[640px] opacity-95 hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={() => setChartError(true)}
              />
            ) : (
              <div className="py-12 text-center text-muted text-sm font-mono">
                Contribution data is active on GitHub.{' '}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline ml-1"
                >
                  View live graph on GitHub
                </a>
              </div>
            )}
          </div>

          {/* Solved Native GitHub Stats & Most Used Languages Cards */}
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {/* Card 1: GitHub Stats */}
            <div className="card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <h3 className="font-display font-semibold text-lg text-text">GitHub Stats</h3>
                  </div>
                  <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                    @{githubUsername}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="bg-surface-alt/70 border border-border/80 rounded-lg p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 text-muted text-xs font-mono">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                        <path d="M6 6h10" />
                        <path d="M6 10h10" />
                      </svg>
                      Public Repos
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-bold text-text">
                      {stats.repos}
                    </div>
                  </div>

                  <div className="bg-surface-alt/70 border border-border/80 rounded-lg p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 text-muted text-xs font-mono">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Total Stars
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-bold text-text">
                      {stats.stars}
                    </div>
                  </div>

                  <div className="bg-surface-alt/70 border border-border/80 rounded-lg p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 text-muted text-xs font-mono">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Followers
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-bold text-text">
                      {stats.followers}
                    </div>
                  </div>

                  <div className="bg-surface-alt/70 border border-border/80 rounded-lg p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 text-muted text-xs font-mono">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gitgreen">
                        <line x1="6" y1="3" x2="6" y2="15" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <path d="M18 9a9 9 0 0 1-9 9" />
                      </svg>
                      Following
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-bold text-text">
                      {stats.following}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gitgreen"></span>
                  Active Contributor
                </span>
                <span>Open Source Developer</span>
              </div>
            </div>

            {/* Card 2: Most Used Languages */}
            <div className="card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-amber"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <h3 className="font-display font-semibold text-lg text-text">
                      Most Used Languages
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {stats.languages.length} Languages
                  </span>
                </div>

                {/* Progress bar showing multi-language proportions */}
                <div className="mt-5 h-2.5 w-full bg-surface-alt rounded-full overflow-hidden flex">
                  {stats.languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percent}%`,
                        backgroundColor: lang.color,
                      }}
                      className="h-full transition-all duration-500"
                      title={`${lang.name}: ${lang.percent}%`}
                    />
                  ))}
                </div>

                {/* Languages breakdown grid */}
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  {stats.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-alt/40 border border-border/40 hover:border-border transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="font-mono text-xs text-text truncate">
                          {lang.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-muted shrink-0 ml-2">
                        {lang.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                <span>Calculated across public repos</span>
                <span className="text-accent">Live breakdown</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View full profile on GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
