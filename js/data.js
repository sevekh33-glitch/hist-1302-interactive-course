/* ============================================================
   COURSE CONTENT — HIST 1302: U.S. History Since 1876
   Edit this file to add modules, questions, games and sources.
   All quoted primary sources are in the U.S. public domain.
   ============================================================ */

const COURSE = {
  title: "HIST 1302",
  subtitle: "Interactive Survey of U.S. History Since 1876",
  modules: [

    /* ----------------------------------------------------------
       MODULE 1 — RECONSTRUCTION
       ---------------------------------------------------------- */
    {
      id: "m1",
      number: 1,
      theme: "navy",
      title: "Reconstruction & the New South",
      era: "1865 – 1877",
      tagline: "How do you rebuild a nation after a civil war? The first great debate over freedom, citizenship and the power of the federal government.",
      objectives: [
        "Compare Presidential and Congressional (Radical) Reconstruction.",
        "Explain how the 13th, 14th and 15th Amendments redefined American citizenship.",
        "Evaluate the promise and limits of freedom for formerly enslaved people.",
        "Analyze why Reconstruction ended in 1877 and what followed."
      ],
      video: {
        id: "nowsS7pMApI",
        title: "Reconstruction and 1876",
        credit: "Crash Course U.S. History #22 · PBS · 12:59",
        question: "While you watch: what did Radical Republicans want that Andrew Johnson opposed?"
      },
      reading: {
        lede: "Between 1865 and 1877 the United States faced a question it had never answered before: what does freedom actually mean, and who gets to define it?",
        sections: [
          {
            h: "Three plans, one shattered South",
            p: "Abraham Lincoln's <span class='term' data-def='A plan announced in 1863: a rebel state could return to the Union once 10% of its 1860 voters swore an oath of loyalty.'>Ten Percent Plan</span> was lenient — it sought a quick reunion. After Lincoln's assassination, Andrew Johnson offered <span class='term' data-def='Reconstruction directed by the president (1865–67): Johnson appointed provisional governors and allowed all-white state conventions.'>Presidential Reconstruction</span>, and the former Confederate states passed <span class='term' data-def='Laws enacted by Southern states in 1865–66 that restricted the rights of freed people and bound them to labor contracts.'>Black Codes</span> that looked disturbingly like slavery under another name. Congress responded with the Civil Rights Act of 1866 and the <span class='term' data-def='The 1867 law that divided the South into five military districts and required new state constitutions with Black male suffrage.'>Reconstruction Act of 1867</span>, placing the South under military rule until new governments were formed."
          },
          {
            h: "A constitutional revolution",
            p: "Three amendments reshaped the Constitution. The <span class='term' data-def='Ratified in 1865: abolished slavery throughout the United States except as punishment for a crime.'>13th Amendment</span> ended slavery. The <span class='term' data-def='Ratified in 1868: defined birthright citizenship and guaranteed equal protection of the laws and due process.'>14th Amendment</span> made freed people citizens and remains the most litigated amendment in American history. The <span class='term' data-def='Ratified in 1870: prohibited denying the vote on account of race, color, or previous condition of servitude — but said nothing about sex or literacy tests.'>15th Amendment</span> enfranchised Black men. In a few short years the national government had become, in Charles Sumner's phrase, 'the custodian of freedom.'"
          },
          {
            h: "The limits of liberty",
            p: "The <span class='term' data-def='Established in 1865 to aid freed people and poor whites with food, schools, medical care and labor contracts; closed in 1872.'>Freedmen's Bureau</span> built schools and negotiated labor contracts, but land — the key to independence — was largely returned to former Confederate owners. Most freed people became <span class='term' data-def='A system in which a tenant farmer paid a landlord a share of the crop, often falling into a cycle of debt.'>sharecroppers</span>, trapped between debt and the cotton market. Meanwhile the Ku Klux Klan (founded 1866) and other white supremacist groups used terror to drive Black voters and Republican officials from power."
          },
          {
            h: "The bargain that ended it",
            p: "The disputed election of 1876 between Samuel Tilden and Rutherford B. Hayes went to a 15-member Electoral Commission. The informal <span class='term' data-def='The 1877 agreement that gave Hayes the presidency in exchange for withdrawing federal troops from the last Southern statehouses.'>Compromise of 1877</span> handed the presidency to Hayes and the South back to white Democratic 'Redeemers.' Within years, <span class='term' data-def='State and local laws enacted after Reconstruction that segregated public spaces and systematically disenfranchised Black Americans.'>Jim Crow laws</span> and poll taxes dismantled many of Reconstruction's gains — but the amendments remained, waiting for the Civil Rights Movement of the 1950s and 60s, sometimes called the Second Reconstruction."
          }
        ],
        glossary: [
          { t: "Ten Percent Plan", d: "Lincoln's 1863 plan: readmission when 10% of a state's 1860 voters took a loyalty oath." },
          { t: "Black Codes", d: "1865–66 Southern laws restricting freed people's rights and labor mobility." },
          { t: "Freedmen's Bureau", d: "Federal agency (1865–72) providing relief, schools and labor aid to freed people." },
          { t: "Sharecropping", d: "Crop-share tenancy that often trapped farmers in cycles of debt." },
          { t: "Radical Republicans", d: "Congressional Republicans who demanded Black civil rights and a reconstructed South." },
          { t: "Compromise of 1877", d: "Deal that ended Reconstruction in exchange for Hayes's presidency." }
        ]
      },
      matching: {
        title: "Match the milestone",
        prompt: "Click an item on the left, then its partner on the right.",
        pairs: [
          { a: "13th Amendment · 1865", b: "Abolished slavery" },
          { a: "14th Amendment · 1868", b: "Citizenship & equal protection" },
          { a: "15th Amendment · 1870", b: "Vote regardless of race" },
          { a: "Freedmen's Bureau · 1865", b: "Relief, schools & labor contracts" },
          { a: "Reconstruction Act · 1867", b: "Five military districts in the South" },
          { a: "Compromise · 1877", b: "Federal troops leave the South" }
        ]
      },
      ordering: {
        title: "Build the timeline",
        prompt: "Click the events in the order they happened (earliest first). Tap a placed event to undo.",
        items: [
          { year: "1865", text: "13th Amendment ratified" },
          { year: "1866", text: "Southern states pass Black Codes" },
          { year: "1867", text: "Reconstruction Act creates military districts" },
          { year: "1868", text: "14th Amendment ratified; Grant elected" },
          { year: "1870", text: "15th Amendment ratified" },
          { year: "1876", text: "Disputed presidential election" },
          { year: "1877", text: "Compromise ends Reconstruction" }
        ]
      },
      flashcards: [
        { front: "Presidential Reconstruction", back: "Johnson's lenient plan (1865–67): white Southern governments, no Black voting, land returned to former owners." },
        { front: "Radical Reconstruction", back: "Congress's plan from 1867: military districts, new constitutions, Black male suffrage, 14th Amendment." },
        { front: "Civil Rights Act of 1866", back: "Declared all persons born in the U.S. to be citizens with equal rights; Johnson vetoed it, Congress overrode the veto." },
        { front: "Carpetbagger", back: "Northernner who moved South during Reconstruction — a term of ridicule used by white Southerners." },
        { front: "Scalawag", back: "White Southerner who supported Reconstruction and the Republican Party." },
        { front: "Redeemer", back: "White Southern Democrat who claimed to have 'redeemed' the South from Republican rule by 1877." }
      ],
      source: {
        meta: "Primary source · 1866",
        title: "The Black Codes of St. Landry Parish, Louisiana",
        text: "Be it ordained by the police jury of the parish of St. Landry, That no negro shall be allowed to pass within the limits of said parish without special permit in writing from his employer. [...] Every negro is required to be in the regular service of some white person, or former owner, who shall be held responsible for the conduct of said negro. [...] No negro shall be permitted to preach, exhort, or otherwise declaim to congregations of colored people, without a special permission in writing from the president of the police jury.",
        credit: "Black Codes, St. Landry Parish, Louisiana (1866), quoted in Eric Foner, Reconstruction: America's Unfinished Revolution, 1863–1877.",
        questions: [
          {
            q: "What do these ordinances reveal about the meaning of 'freedom' in the postwar South?",
            options: [
              "Freedom meant full civic equality under the law.",
              "White authorities redefined freedom as controlled labor and restricted movement.",
              "The federal government had already secured equality before these laws were written.",
              "The codes applied equally to all residents of the parish."
            ],
            answer: 1,
            explain: "The codes replaced slavery with a new system of control: movement required an employer's permission, labor was compulsory, and even preaching needed official approval — all while calling people 'free.'"
          },
          {
            q: "Why did Congress respond with the Civil Rights Act of 1866 and the 14th Amendment?",
            options: [
              "Because the codes showed Southern states would not protect freed people's rights on their own.",
              "Because Congress wanted to punish the South economically.",
              "Because Johnson asked Congress to act.",
              "Because the Supreme Court had struck down the codes."
            ],
            answer: 0,
            explain: "The Black Codes convinced congressional Republicans that federal intervention and constitutional guarantees were necessary to make freedom meaningful."
          }
        ]
      },
      quiz: [
        {
          q: "What was the central difference between Presidential and Radical Reconstruction?",
          options: [
            "Radical Republicans wanted a faster return of Southern states.",
            "Presidential Reconstruction quickly restored Confederate leaders; Radicals required new governments, Black male suffrage and federal enforcement.",
            "Radical Republicans wanted to abolish the presidency.",
            "There was no meaningful difference."
          ],
          answer: 1,
          explain: "Johnson's approach readmitted all-white governments with few conditions; Congress imposed military districts, new constitutions and the 14th Amendment."
        },
        {
          q: "Which amendment guaranteed 'equal protection of the laws'?",
          options: ["The 13th", "The 14th", "The 15th", "The 19th"],
          answer: 1,
          explain: "Section 1 of the 14th Amendment (1868) defines citizenship and guarantees equal protection and due process — the basis of most modern civil rights litigation."
        },
        {
          q: "Why did land reform largely fail during Reconstruction?",
          options: [
            "Freed people did not want land.",
            "Congress banned land sales.",
            "Land was returned to former Confederate owners; confiscation was politically unacceptable to most Republicans.",
            "The Supreme Court distributed it to railroads."
          ],
          answer: 2,
          explain: "Sherman's Field Order 15 and the Freedmen's Bureau briefly raised hopes for '40 acres,' but Johnson ordered land returned to its former owners."
        },
        {
          q: "What was sharecropping?",
          options: [
            "A system where tenants paid landlords a share of the crop, often creating a debt cycle.",
            "A federal program that gave land to veterans.",
            "A labor system used only in Northern factories.",
            "Another name for the Freedmen's Bureau."
          ],
          answer: 0,
          explain: "With little access to land or credit, many freed families rented land and paid a share of the harvest — a system that often kept them in debt."
        },
        {
          q: "Which combination of factors ended Reconstruction?",
          options: [
            "Northern fatigue, economic depression, violent white resistance and the election of 1876.",
            "A Supreme Court ruling alone.",
            "The passage of the 19th Amendment.",
            "The outbreak of World War I."
          ],
          answer: 0,
          explain: "The Panic of 1873, Klan violence, declining Northern commitment and the disputed 1876 election produced the Compromise of 1877."
        },
        {
          q: "What is one major legacy of Reconstruction?",
          options: [
            "It permanently resolved racial inequality.",
            "Its amendments became the constitutional foundation for the Civil Rights Movement a century later.",
            "It established a national system of public universities only.",
            "It ended all forms of state violence."
          ],
          answer: 1,
          explain: "The 13th–15th Amendments remained in the Constitution and were revived in the 1950s–60s — hence the 'Second Reconstruction.'"
        }
      ]
    },

    /* ----------------------------------------------------------
       MODULE 2 — THE GILDED AGE
       ---------------------------------------------------------- */
    {
      id: "m2",
      number: 2,
      theme: "rust",
      title: "The Gilded Age",
      era: "1870s – 1890s",
      tagline: "Rockefeller, Tammany Hall and the Populist revolt: enormous wealth, raw democracy and a question — who does the economy belong to?",
      objectives: [
        "Describe how railroads, steel and oil reshaped the American economy.",
        "Compare the strategies of industrialists and the responses of workers.",
        "Explain the role of political machines and the rise of urbanization.",
        "Analyze the Populist challenge and the election of 1896."
      ],
      video: {
        id: "Spgdy3HkcSs",
        title: "Gilded Age Politics",
        credit: "Crash Course U.S. History #26 · PBS · 13:51",
        question: "While you watch: why did the Populists support William Jennings Bryan even though he was a Democrat?"
      },
      reading: {
        lede: "Mark Twain named the era 'gilded' — gold-plated, but base metal underneath. It was an age of astonishing industrial growth and astonishing inequality.",
        sections: [
          {
            h: "The machine age",
            p: "The completion of the <span class='term' data-def='The 1869 rail link between Omaha and Sacramento that created a true national market.'>transcontinental railroad</span> (1869) bound the continent into one market. Steel, oil and rail made fortunes. <span class='term' data-def='Pioneered in Standard Oil: controlling every stage of production, from raw material to distribution.'>Vertical integration</span> and <span class='term' data-def='Combining competing firms in the same industry to control prices — the basis of a trust.'>horizontal integration</span> let industrialists like Carnegie and Rockefeller dominate entire industries. Americans debated whether they were 'captains of industry' or '<span class='term' data-def='A criticism of industrialists accused of gaining wealth through exploitation, monopoly and political corruption.'>robber barons</span>.'"
          },
          {
            h: "Workers organize",
            p: "Railroad strikes in 1877 showed the power of coordinated labor. The <span class='term' data-def='Founded 1869; one of the first national labor unions, open to skilled and unskilled workers, women and Black workers.'>Knights of Labor</span> grew to 700,000 members, while the American Federation of Labor (1886) focused on skilled workers, wages and hours. The <span class='term' data-def='An 1886 Chicago labor rally turned violent after a bomb killed police officers; it became a symbol of labor radicalism.'>Haymarket affair</span> (1886) and the violent defeats at Homestead (1892) and <span class='term' data-def='The 1894 strike against the Pullman Company, crushed with federal troops — a turning point in labor history.'>Pullman</span> (1894) revealed the limits of workers' power against corporations and the state."
          },
          {
            h: "Cities, immigrants, machines",
            p: "Millions of 'new immigrants' from southern and eastern Europe crowded into cities, where they found jobs, tenements and political machines. <span class='term' data-def='An organization that traded jobs, housing and favors for votes — Tammany Hall in New York was the most famous.'>Political machines</span> like Tammany Hall were corrupt, but they also provided services the government did not. Boss Tweed's courthouse graft became a symbol of the era, while reformers won the <span class='term' data-def='The 1883 law creating a merit-based civil service for a portion of federal jobs, replacing the spoils system.'>Civil Service Act of 1883</span>."
          },
          {
            h: "The Populist revolt",
            p: "Farmers facing falling prices and high railroad rates built the Grange and Farmers' Alliance, then the <span class='term' data-def='The People's Party, founded 1892, which demanded railroad regulation, a graduated income tax, direct election of senators and free silver.'>People's (Populist) Party</span>. Its 1892 Omaha Platform demanded a graduated income tax and government control of railroads. In 1896 the Democrats adopted <span class='term' data-def='The policy of coining silver at a 16:1 ratio to gold to expand the money supply and raise crop prices.'>free silver</span> and nominated William Jennings Bryan. His 'Cross of Gold' speech electrified the convention, but business poured money into McKinley's campaign and Bryan lost — effectively ending the Populist Party, though many of its ideas later became law."
          }
        ],
        glossary: [
          { t: "Transcontinental railroad", d: "Completed in 1869; linked the Atlantic and Pacific markets." },
          { t: "Vertical integration", d: "Owning every stage of production, from raw materials to sales." },
          { t: "Trust", d: "A combination of companies that controls an industry and prices." },
          { t: "Political machine", d: "A party organization trading favors and jobs for votes." },
          { t: "Populism", d: "The People's Party movement of farmers and workers in the 1890s." },
          { t: "Free silver", d: "Unlimited coinage of silver to inflate the currency and aid debtors." }
        ]
      },
      matching: {
        title: "Who built what?",
        prompt: "Match the figure to the industry or role they are associated with.",
        pairs: [
          { a: "Andrew Carnegie", b: "Steel" },
          { a: "John D. Rockefeller", b: "Oil / Standard Oil" },
          { a: "Cornelius Vanderbilt", b: "Railroads" },
          { a: "Alexander Graham Bell", b: "Telephone" },
          { a: "Thomas Edison", b: "Electric light & power" },
          { a: "Boss Tweed", b: "Tammany Hall machine" }
        ]
      },
      ordering: {
        title: "A turbulent quarter-century",
        prompt: "Put these events in chronological order.",
        items: [
          { year: "1869", text: "Transcontinental railroad completed" },
          { year: "1877", text: "Great Railroad Strike" },
          { year: "1883", text: "Civil Service Act passed" },
          { year: "1886", text: "Haymarket affair in Chicago" },
          { year: "1892", text: "Homestead strike; Populist Party founded" },
          { year: "1894", text: "Pullman Strike" },
          { year: "1896", text: "Bryan vs. McKinley — 'Cross of Gold'" }
        ]
      },
      flashcards: [
        { front: "Gilded Age", back: "Term from Twain & Warner's 1873 novel: an era of glittering wealth covering deep political corruption and inequality." },
        { front: "Horizontal integration", back: "Buying out competitors in the same business — Rockefeller's strategy in oil refining." },
        { front: "Sherman Anti-Trust Act", back: "The 1890 law banning combinations that restrained trade; rarely used against trusts, often against unions." },
        { front: "Knights of Labor", back: "National union founded 1869 that sought an eight-hour day and organized across skill, race and gender." },
        { front: "Spoils system", back: "The practice of awarding government jobs to political supporters; partially replaced by the Civil Service Act of 1883." },
        { front: "Omaha Platform", back: "The Populists' 1892 platform: subtreasury plan, government ownership of railroads, income tax, direct election of senators, free silver." }
      ],
      source: {
        meta: "Primary source · 1892",
        title: "Preamble to the People's Party (Populist) Platform, Omaha",
        text: "The conditions of the farmers of the country are growing worse, and the causes which have produced this condition are still in operation. [...] Corruption dominates the ballot-box, the Legislatures, the Congress, and touches even the ermine of the bench. The people are demoralized; most of the newspapers are subsidized or muzzled; public opinion silenced; business prostrated; our homes covered with mortgages; labor impoverished; and the land concentrated in the hands of capitalists. [...] From the same prolific womb of governmental injustice we breed the two great classes — tramps and millionaires.",
        credit: "People's Party Platform, Omaha, Nebraska, July 4, 1892 (public domain).",
        questions: [
          {
            q: "According to the Populists, what was the root of the nation's problems?",
            options: [
              "Too much immigration",
              "Government injustice and the concentration of wealth and land",
              "A lack of railroads",
              "High wages for industrial workers"
            ],
            answer: 1,
            explain: "The platform explicitly blamed 'governmental injustice,' corrupt politics and the concentration of land and capital — producing both 'tramps and millionaires.'"
          },
          {
            q: "Which later Progressive reform was already in the Populist platform?",
            options: [
              "The graduated income tax and direct election of senators",
              "The 18th Amendment",
              "The Pendleton Act",
              "The Homestead Act"
            ],
            answer: 0,
            explain: "The 16th (income tax) and 17th (direct election of senators) Amendments were Populist demands before they became Progressive achievements."
          }
        ]
      },
      quiz: [
        {
          q: "Why is the era called the 'Gilded Age'?",
          options: [
            "Because gold was discovered in California.",
            "It came from Twain and Warner's novel, suggesting glittering wealth covering underlying problems.",
            "Because the U.S. adopted the gold standard in 1873.",
            "Because of the gilded halls of Congress."
          ],
          answer: 1,
          explain: "The term came from the 1873 novel The Gilded Age: A Tale of Today and came to symbolize prosperity masking corruption and inequality."
        },
        {
          q: "Rockefeller's Standard Oil primarily grew through:",
          options: [
            "Government subsidies",
            "Vertical integration and horizontal consolidation of refining",
            "Exclusive patents on oil drilling",
            "Avoiding the use of railroads"
          ],
          answer: 1,
          explain: "Standard Oil controlled refining, pipelines and distribution, buying out competitors — a model of both vertical and horizontal integration."
        },
        {
          q: "What did the Homestead and Pullman strikes demonstrate?",
          options: [
            "Unions had little influence on American politics.",
            "The federal and state governments often sided with employers, using troops and court orders to break strikes.",
            "Workers won most of their demands.",
            "Industrial violence had ended by the 1890s."
          ],
          answer: 1,
          explain: "Federal troops and injunctions were used in both disputes, revealing the limits of labor power in confrontations with corporations."
        },
        {
          q: "What did political machines offer urban immigrants?",
          options: [
            "Only corrupt contracts for themselves.",
            "Jobs, housing and emergency aid in exchange for votes.",
            "Free college education.",
            "High-paying factory jobs guaranteed by law."
          ],
          answer: 1,
          explain: "Machines were exchanges: material help and favors for political loyalty — which is why they survived despite corruption."
        },
        {
          q: "What did the Populists mean by 'free silver'?",
          options: [
            "Giving silver away to farmers",
            "Coining silver freely to expand the money supply and raise agricultural prices",
            "Abolishing the gold standard purely for aesthetic reasons",
            "Using silver to pay off the national debt only"
          ],
          answer: 1,
          explain: "More money in circulation would raise crop prices and make debts easier to pay — a demand that clashed with creditors and urban workers."
        },
        {
          q: "What happened to the Populist Party after 1896?",
          options: [
            "It became the dominant party in the North.",
            "It declined after Bryan's defeat, but many of its ideas were later adopted by Progressives.",
            "It immediately merged with the Republican Party.",
            "It elected the president in 1900."
          ],
          answer: 1,
          explain: "Bryan's loss ended the party as a force, but the income tax, direct election of senators and railroad regulation all became law later."
        }
      ]
    },

    /* ----------------------------------------------------------
       MODULE 3 — THE PROGRESSIVE ERA
       ---------------------------------------------------------- */
    {
      id: "m3",
      number: 3,
      theme: "green",
      title: "The Progressive Era",
      era: "1890s – 1920",
      tagline: "Muckrakers, trust-busters and reformers tried to make industrial America fairer — while building a more restrictive order at the same time.",
      objectives: [
        "Explain how muckraking journalism shaped public policy.",
        "Identify the major reforms of Roosevelt, Taft and Wilson.",
        "Analyze the tension between expert rule and direct democracy.",
        "Assess the limits of Progressivism for Black Americans and immigrants."
      ],
      video: {
        id: "i0Q4zPR4G7M",
        title: "The Progressive Era",
        credit: "Crash Course U.S. History #27 · PBS · 14:59",
        question: "While you watch: what is the central contradiction of Progressivism?"
      },
      reading: {
        lede: "If the Gilded Age was when industrial capitalism came into its own, the Progressive Era was when Americans tried to tame it.",
        sections: [
          {
            h: "Exposing the muck",
            p: "<span class='term' data-def='Investigative journalists of the 1900s who exposed corruption and social abuses in mass-circulation magazines.'>Muckrakers</span> turned reporting into a weapon. Upton Sinclair's <em>The Jungle</em> (1906) shocked readers with the meatpacking industry and helped produce the <span class='term' data-def='Federal laws of 1906 that regulated food and drug safety and meatpacking.'>Pure Food and Drug Act</span> and Meat Inspection Act. Ida Tarbell attacked Standard Oil; Lincoln Steffens exposed city corruption; Lewis Hine's photographs of child labor made the problem impossible to ignore. Sinclair had hoped to reach the heart; he reached the stomach — and legislation followed."
          },
          {
            h: "The presidents and the 'trusts'",
            p: "Theodore Roosevelt brought the federal government into the economy with the 'Square Deal': <span class='term' data-def='Roosevelt's use of the Sherman Act to break up monopolies such as Standard Oil in 1911.'>trust-busting</span>, railroad regulation and <span class='term' data-def='The movement to manage forests, water and wildlife as a public trust; led by Roosevelt and Gifford Pinchot.'>conservation</span>. William Howard Taft continued the prosecutions but alienated progressives. Woodrow Wilson's 'New Freedom' produced the Federal Reserve Act (1913), the Clayton Antitrust Act and the Federal Trade Commission. The 16th (income tax) and 17th (direct election of senators) Amendments were also ratified in this period."
          },
          {
            h: "Experts and voters",
            p: "Progressives trusted scientists and experts: Frederick Taylor's 'scientific management' reshaped factories and even schools. Cities hired <span class='term' data-def='A system in which a small elected commission or hired manager runs a city, emphasizing expertise over party politics.'>city managers</span>, and states adopted the <span class='term' data-def='Procedures allowing citizens to propose laws (initiative), vote on them directly (referendum) and remove officials (recall).'>initiative, referendum and recall</span>. But many reformers distrusted ordinary voters, especially immigrants and Black Americans. Reform and restriction marched together."
          },
          {
            h: "The color line and the vote",
            p: "<span class='term' data-def='The 1896 Supreme Court decision upholding racial segregation under the fiction of \"separate but equal.\"'>Plessy v. Ferguson</span> (1896) legitimized segregation, and Southern states used poll taxes and literacy tests to strip Black men of the vote guaranteed by the 15th Amendment. Booker T. Washington urged vocational education and accommodation; W. E. B. Du Bois and the NAACP (1909) demanded 'persistent, manly agitation' for full civil rights. At the same time, the suffrage movement won victories in the West, and in 1920 the <span class='term' data-def='Ratified in 1920, it prohibited denying the vote on account of sex.'>19th Amendment</span> enfranchised women nationally — a landmark won partly through women's wartime work."
          }
        ],
        glossary: [
          { t: "Muckraker", d: "Investigative journalist exposing corruption and abuse in mass magazines." },
          { t: "Trust-busting", d: "Federal prosecution of monopolies under the Sherman and Clayton Acts." },
          { t: "Conservation", d: "The movement to manage natural resources for the public good." },
          { t: "Initiative / referendum / recall", d: "Tools of direct democracy allowing citizens to propose, vote on and undo laws or officials." },
          { t: "NAACP", d: "National Association for the Advancement of Colored People, founded 1909." },
          { t: "19th Amendment", d: "Ratified 1920; prohibits voting discrimination on the basis of sex." }
        ]
      },
      matching: {
        title: "Match the reformer",
        prompt: "Who wrote, photographed or founded what?",
        pairs: [
          { a: "Upton Sinclair", b: "The Jungle · meatpacking" },
          { a: "Ida Tarbell", b: "History of Standard Oil" },
          { a: "Lincoln Steffens", b: "The Shame of the Cities" },
          { a: "Jacob Riis", b: "How the Other Half Lives" },
          { a: "Lewis Hine", b: "Child labor photography" },
          { a: "W. E. B. Du Bois", b: "Co-founder of the NAACP" }
        ]
      },
      ordering: {
        title: "Reform in sequence",
        prompt: "Put these milestones in chronological order.",
        items: [
          { year: "1889", text: "Jane Addams founds Hull House" },
          { year: "1896", text: "Plessy v. Ferguson upholds segregation" },
          { year: "1906", text: "Pure Food & Drug Act" },
          { year: "1909", text: "NAACP founded" },
          { year: "1911", text: "Standard Oil broken up" },
          { year: "1913", text: "17th Amendment & Federal Reserve Act" },
          { year: "1920", text: "19th Amendment ratified" }
        ]
      },
      flashcards: [
        { front: "Muckrakers", back: "Journalists such as Sinclair, Tarbell and Steffens who exposed corporate and political abuses in popular magazines." },
        { front: "Square Deal", back: "Roosevelt's domestic program: fairness for workers and consumers, trust-busting and conservation." },
        { front: "Pure Food and Drug Act", back: "The 1906 law (with the Meat Inspection Act) that created federal oversight of food and medicine." },
        { front: "17th Amendment", back: "Ratified 1913: senators are elected directly by the people instead of by state legislatures." },
        { front: "Settlement house", back: "A community center in a poor urban neighborhood — Hull House (1889), founded by Jane Addams." },
        { front: "Du Bois vs. Washington", back: "Washington emphasized vocational training and accommodation; Du Bois demanded immediate civil and political rights." }
      ],
      source: {
        meta: "Primary source · 1906",
        title: "Upton Sinclair, The Jungle (Chapter 14)",
        text: "Let a man so much as scrape his finger pushing a truck in the pickle-rooms, and all the joints in his fingers might be eaten by the acid, one by one. Of the butchers and floormen, the beef-boners and trimmers, and all those who used knives, you could scarcely find a person who had the use of his thumb; time and time again the base of it had been slashed, till it was a mere lump of flesh against which the man pressed the knife to hold it. [...] They would have no nails — they had worn them off pulling hides.",
        credit: "Upton Sinclair, The Jungle (1906), public domain.",
        questions: [
          {
            q: "Sinclair intended to expose the exploitation of workers. Which reform resulted most directly from public reaction to this passage?",
            options: [
              "The 19th Amendment",
              "The Meat Inspection Act and Pure Food and Drug Act of 1906",
              "The Sherman Anti-Trust Act",
              "The Homestead Act"
            ],
            answer: 1,
            explain: "Readers were outraged about the food supply rather than the workers — and Congress passed food and meat inspection laws within months."
          },
          {
            q: "What does this passage suggest about industrial work at the time?",
            options: [
              "Factory work was safe and well regulated.",
              "Workers faced severe hazards with little protection.",
              "Machines had eliminated all manual labor.",
              "Unions had already won eight-hour days nationwide."
            ],
            answer: 1,
            explain: "Sinclair's graphic description of mangled hands and fingers illustrates the human cost of unregulated industrial production."
          }
        ]
      },
      quiz: [
        {
          q: "What was the main target of muckraking journalists?",
          options: [
            "Foreign governments",
            "Corruption, monopoly and social abuses in American industry and politics",
            "The U.S. military",
            "Religious institutions only"
          ],
          answer: 1,
          explain: "Muckrakers wrote exposés of trusts, city machines, child labor and unsafe products in mass-circulation magazines."
        },
        {
          q: "Which law was a direct response to The Jungle?",
          options: [
            "The Clayton Antitrust Act",
            "The Pure Food and Drug Act of 1906",
            "The 17th Amendment",
            "The Espionage Act"
          ],
          answer: 1,
          explain: "Public outrage over contaminated meat produced the Pure Food and Drug Act and the Meat Inspection Act in 1906."
        },
        {
          q: "What was a major contradiction of Progressivism?",
          options: [
            "It expanded democracy for some while restricting it for others.",
            "It rejected all use of experts.",
            "It was opposed to any form of reform.",
            "It ended industrial capitalism."
          ],
          answer: 0,
          explain: "The 17th Amendment and direct primaries expanded participation, while poll taxes, literacy tests and immigration restrictions narrowed it."
        },
        {
          q: "How did Booker T. Washington and W. E. B. Du Bois differ?",
          options: [
            "Washington favored immediate protest; Du Bois favored accommodation.",
            "Washington emphasized vocational education and accommodation; Du Bois demanded full civil rights and co-founded the NAACP.",
            "Both opposed education for Black Americans.",
            "They agreed on every major issue."
          ],
          answer: 1,
          explain: "Their debate over how to confront segregation became one of the defining arguments over civil rights strategy."
        },
        {
          q: "Which reform gave voters the direct election of U.S. senators?",
          options: ["The 16th Amendment", "The 17th Amendment", "The 18th Amendment", "The 19th Amendment"],
          answer: 1,
          explain: "The 17th Amendment (1913) removed the election of senators from state legislatures — a long-standing Populist demand."
        },
        {
          q: "What did the 19th Amendment accomplish?",
          options: [
            "It ended Prohibition.",
            "It prohibited denying the vote on account of sex.",
            "It established the eight-hour workday.",
            "It created the Federal Reserve."
          ],
          answer: 1,
          explain: "Ratified in 1920 after decades of suffrage organizing, it enfranchised women — though many Black women still faced segregation-era barriers."
        }
      ]
    },

    /* ----------------------------------------------------------
       MODULE 4 — WORLD WAR I
       ---------------------------------------------------------- */
    {
      id: "m4",
      number: 4,
      theme: "plum",
      title: "America & the Great War",
      era: "1914 – 1920",
      tagline: "Neutrality, propaganda, the draft and the fight over free speech at home — how a 19-month war transformed the American state.",
      objectives: [
        "Explain why the U.S. abandoned neutrality in 1917.",
        "Describe how the war expanded federal power over the economy and public opinion.",
        "Analyze the conflict over civil liberties during the war.",
        "Evaluate the war's consequences at home and in world affairs."
      ],
      video: {
        id: "y59wErqg4Xg",
        title: "America in World War I",
        credit: "Crash Course U.S. History #30 · PBS · 13:40",
        question: "While you watch: was the Lusitania the immediate cause of U.S. entry? Why or why not?"
      },
      reading: {
        lede: "America fought in the Great War for only 19 months — but the conflict reshaped the federal government, civil liberties and the nation's place in the world.",
        sections: [
          {
            h: "From neutrality to war",
            p: "President Wilson declared neutrality in 1914, reflecting a long American tradition of avoiding European conflicts. The sinking of the <span class='term' data-def='British ocean liner torpedoed by a German U-boat in 1915; 128 Americans died while it carried munitions.'>Lusitania</span> in 1915 outraged Americans but did not bring war — the U.S. entered almost two years later. In early 1917 Germany resumed <span class='term' data-def='Germany's 1917 policy of sinking all ships, including neutral and passenger vessels, in war zones.'>unrestricted submarine warfare</span>, and the <span class='term' data-def='A secret German proposal, intercepted in 1917, offering Mexico land in return for joining the war against the U.S.'>Zimmermann Telegram</span> proposed a German–Mexican alliance. With the fall of the Russian tsar making 'making the world safe for democracy' more plausible, Congress declared war on April 6, 1917."
          },
          {
            h: "The home front mobilizes",
            p: "The <span class='term' data-def='The 1917 law requiring millions of men to register for the military draft.'>Selective Service Act</span> (May 1917) expanded the army from about 120,000 to millions. New agencies directed the economy: the War Industries Board set production quotas and prices, the Railroad Administration ran the railways, and the War Labor Board pushed for better wages and conditions. The <span class='term' data-def='The Wilson administration's propaganda agency, led by George Creel, which used posters, films and 75,000 \"Four Minute Men\" to build support for the war.'>Committee on Public Information</span>, led by George Creel, flooded the country with posters, films and speeches by 75,000 'Four Minute Men.'"
          },
          {
            h: "Dissent and repression",
            p: "The <span class='term' data-def='The 1917 law criminalizing espionage, interference with the draft and false statements hindering the war effort.'>Espionage Act of 1917</span>, the <span class='term' data-def='The 1918 law that made it a crime to speak contemptuously of the government or the war.'>Sedition Act of 1918</span> and the Supreme Court's 'clear and present danger' ruling in <span class='term' data-def='The 1919 Supreme Court case upholding a draft-evasion conviction and allowing punishment of speech creating a \"clear and present danger.\"'>Schenck v. United States</span> (1919) narrowed free speech. Socialist Eugene Debs was imprisoned for an anti-war speech — and won nearly a million votes for president from prison in 1920. The 1919 Palmer Raids and nationwide strikes deepened the 'Red Scare.'"
          },
          {
            h: "Results, at home and abroad",
            p: "Wartime jobs accelerated the <span class='term' data-def='The mass movement of African Americans from the rural South to northern and western cities, beginning during World War I.'>Great Migration</span>, reshaping the map of Black America. Women's wartime contributions strengthened the suffrage movement, and the 19th Amendment was ratified in 1920. But Wilson's <span class='term' data-def='Wilson's 1918 program for a just peace, including open diplomacy, self-determination and a league of nations.'>Fourteen Points</span> were only partly realized at Versailles: the League of Nations was created, but the U.S. Senate refused to join, and the U.S. retreated into <span class='term' data-def='A policy of avoiding permanent involvement in European affairs, especially between the two world wars.'>isolationism</span> — a failure with consequences a generation later."
          }
        ],
        glossary: [
          { t: "Lusitania", d: "British liner sunk by a German submarine in 1915; a major shock, not the immediate cause of war." },
          { t: "Zimmermann Telegram", d: "Intercepted 1917 German proposal for an alliance with Mexico against the U.S." },
          { t: "Committee on Public Information", d: "The Creel Committee: the government's wartime propaganda apparatus." },
          { t: "Espionage Act", d: "1917 law against spying, draft interference and 'false statements.'" },
          { t: "Great Migration", d: "The movement of millions of Black Americans north and west beginning in the 1910s." },
          { t: "Fourteen Points", d: "Wilson's 1918 plan for a liberal international order and a League of Nations." }
        ]
      },
      matching: {
        title: "The players and the powers",
        prompt: "Match each name or event to its role in the story.",
        pairs: [
          { a: "Woodrow Wilson", b: "Fourteen Points & the League" },
          { a: "George Creel", b: "Committee on Public Information" },
          { a: "John J. Pershing", b: "Commander of American forces" },
          { a: "Eugene V. Debs", b: "Socialist jailed for anti-war speech" },
          { a: "Zimmermann Telegram", b: "Proposed German–Mexican alliance" },
          { a: "Lusitania", b: "British liner sunk in 1915" }
        ]
      },
      ordering: {
        title: "The road to war and beyond",
        prompt: "Put these events in chronological order.",
        items: [
          { year: "1914", text: "War breaks out in Europe; U.S. declares neutrality" },
          { year: "1915", text: "Lusitania is sunk" },
          { year: "1916", text: "Wilson reelected: 'He kept us out of war'" },
          { year: "1917", text: "Zimmermann Telegram; U.S. declares war in April" },
          { year: "1918", text: "Armistice; Wilson presents the Fourteen Points" },
          { year: "1919", text: "Versailles Treaty; Palmer Raids; Schenck ruling" },
          { year: "1920", text: "19th Amendment ratified" }
        ]
      },
      flashcards: [
        { front: "Unrestricted submarine warfare", back: "Germany's 1917 decision to sink all vessels in war zones — a key reason the U.S. entered the war." },
        { front: "Selective Service Act", back: "The 1917 draft law that registered 24 million men and expanded the army dramatically." },
        { front: "Four Minute Men", back: "Volunteers who delivered short pro-war speeches in theaters and schools for the CPI." },
        { front: "Sedition Act (1918)", back: "Made it a crime to speak contemptuously of the government, the flag or the war effort." },
        { front: "Schenck v. United States", back: "The 1919 ruling that speech creating a 'clear and present danger' may be punished — the 'fire in a crowded theater' case." },
        { front: "League of Nations", back: "Wilson's proposed international assembly; created at Versailles but never joined by the United States." }
      ],
      source: {
        meta: "Primary source · 1918",
        title: "Woodrow Wilson, Fourteen Points (excerpts)",
        text: "I. Open covenants of peace, openly arrived at, after which there shall be no private international understandings of any kind but diplomacy shall proceed always frankly and in the public view. [...] II. Absolute freedom of navigation upon the seas, outside territorial waters, alike in peace and in war [...] XIV. A general association of nations must be formed under specific covenants for the purpose of affording mutual guarantees of political independence and territorial integrity of great and small states alike.",
        credit: "President Woodrow Wilson, address to Congress, January 8, 1918 (public domain).",
        questions: [
          {
            q: "What vision of international relations do Points I and XIV express?",
            options: [
              "Secret alliances and a balance of power",
              "Open diplomacy and a collective association of nations",
              "Isolationism and permanent neutrality",
              "Unrestricted colonial expansion"
            ],
            answer: 1,
            explain: "Wilson called for transparent diplomacy and a 'general association of nations' — the League of Nations — to guarantee independence and territorial integrity."
          },
          {
            q: "What happened to Wilson's plan at home?",
            options: [
              "The U.S. joined the League immediately.",
              "Congress refused to join the League, and the U.S. returned largely to isolationism.",
              "The Senate ratified the treaty without debate.",
              "The League was abandoned by all powers."
            ],
            answer: 1,
            explain: "The Senate, led by Henry Lodge, refused to ratify the Treaty of Versailles with the League covenant — the U.S. never joined the organization it had proposed."
          }
        ]
      },
      quiz: [
        {
          q: "Which was NOT an immediate cause of U.S. entry into World War I?",
          options: [
            "Resumption of unrestricted submarine warfare in 1917",
            "The Zimmermann Telegram",
            "The sinking of the Lusitania in 1915 by itself",
            "Sympathy for Britain and loans to the Allies"
          ],
          answer: 2,
          explain: "The Lusitania was sunk nearly two years before the U.S. declared war. It shaped opinion, but entry resulted from a combination of 1917 developments."
        },
        {
          q: "What was the purpose of the Committee on Public Information?",
          options: [
            "To negotiate peace",
            "To shape public opinion in support of the war through propaganda",
            "To run the railroads",
            "To draft soldiers"
          ],
          answer: 1,
          explain: "The Creel Committee used posters, films, pamphlets and Four Minute Men to sell the war to the American public."
        },
        {
          q: "Which acts restricted free speech during the war?",
          options: [
            "The Espionage Act of 1917 and Sedition Act of 1918",
            "The Civil Service Act and Sherman Act",
            "The Pure Food and Drug Act",
            "The 16th and 17th Amendments"
          ],
          answer: 0,
          explain: "These laws criminalized draft interference, 'false statements' and criticism of the government or war effort; they were upheld in Schenck (1919)."
        },
        {
          q: "How did World War I contribute to the Great Migration?",
          options: [
            "It created industrial jobs in the North and West that drew Black Southerners.",
            "It forced all Southerners to move to Europe.",
            "It ended segregation in the South.",
            "It banned immigration to northern cities."
          ],
          answer: 0,
          explain: "Labor shortages in northern industry, combined with continuing Southern violence and segregation, accelerated the movement of Black Americans north."
        },
        {
          q: "What was the fate of the League of Nations in the United States?",
          options: [
            "It was eagerly ratified in 1919.",
            "The Senate refused to join, and the U.S. stayed outside it.",
            "It was dissolved before the peace conference.",
            "It became a branch of the U.S. government."
          ],
          answer: 1,
          explain: "Despite Wilson's central role in proposing it, the U.S. never joined — a symbol of the return to isolationism."
        },
        {
          q: "Which statement best summarizes the war's impact on the federal government?",
          options: [
            "It had almost no effect.",
            "It greatly expanded federal power over the economy, labor, information and civil liberties.",
            "It abolished the income tax.",
            "It ended the presidency's war-making powers."
          ],
          answer: 1,
          explain: "Draft, production boards, propaganda and repression made the national government far more powerful than it had been before 1917."
        }
      ]
    }
  ]
};
