import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "jobs.csv");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const jobs = parse(rawData, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const job of jobs) {
    try {
      await prisma.job.create({
        data: {
          company: job.company,
          job_title: job.job_title,
          experience: job.experience,
          job_location: job.job_location,
          job_type: job.job_type,
          work_setting: job.work_setting,
          salary: Number(job.salary),
          date_posted: new Date(job.date_posted),
          h1Type: job.h1Type,
          job_link: job.job_link,
          experience_level: job.experience_level,
          full_description: job.full_description,
          job_category: job.job_category,
        },
      });
    } catch (err) {
      console.error(
        `Error inserting job: ${job.job_title} at ${job.company}`,
        err
      );
    }
  }
  console.log("Job import completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
