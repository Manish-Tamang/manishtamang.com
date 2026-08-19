"use client"

import GithubContributionGraph from "./github-contribution-graph"

export default function GithubContribution() {
    return (
        <section className="w-full">
            <div className="w-full overflow-x-auto md:overflow-visible">
                <div className="w-max md:w-auto">
                    <GithubContributionGraph
                        username="Manish-Tamang"
                        apiBaseUrl="https://github-contributions-api.jogruber.de"
                        rows={7}
                        columns={52}
                        theme="green"
                        enableTooltip={true}
                        tileStyles={{
                            width: 9,
                            height: 9,
                        }}
                        gridStyles={{
                            maxWidth: "100%",
                            width: "fit-content",
                            overflow: "visible"
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
