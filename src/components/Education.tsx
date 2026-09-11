import { motion } from 'framer-motion';
import { education } from '../config/education';

export default function Education() {
  return (
    <section id="education" className="mt-32">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[#A8A8A8]">Education</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Academic foundation and relevant coursework.</h2>
      </div>

      {education.length === 0 ? (
        <div className="rounded-[32px] border border-white/10 bg-[#111111] p-10 text-[#D1D1D1]">
          <p className="text-lg font-semibold text-white">Education details pending CV verification.</p>
          <p className="mt-4 text-sm leading-7">
            Verified academic background and coursework will be added once the CV is available.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((item) => (
            <motion.div
              key={`${item.university}-${item.degree}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#A8A8A8]">{item.university}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.degree}</h3>
              </div>
              <div className="text-right text-sm text-[#A8A8A8]">
                <p>{item.expectedGraduation}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-base leading-7 text-[#D1D1D1]">
                Focused on software engineering, AI, and practical systems design through hands-on projects and technical coursework.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {item.coursework.map((course) => (
                  <div key={course} className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-[#E5E5E5]">
                    {course}
                  </div>
                ))}
              </div>
              {item.awards.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-white">Awards</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-[#D1D1D1]">
                    {item.awards.map((award) => (
                      <li key={award}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.activities.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-white">Activities</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-[#D1D1D1]">
                    {item.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </section>
  );
}
