import React from "react";
import "./ReportingStudio.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { shadow } from "themes/theme";
import {
  IBarChartApplicantData,
  IBarChartAverageSalaryData,
} from "components/Graph/Graph";
import { BarGraph, ReportingStudioLineGraph } from "components";
import { dummyData } from "utils/dataCollection";
import { jobData } from "utils/DummyVacancyData";
import { pageTransitions } from "utils/Animations";

const GraphContainer = styled.div`
  box-shadow: ${shadow};
`;

const getJobsPerLocationObject = (): Record<string, number> =>
  jobData.reduce((result, jobDatum) => {
    const { location } = jobDatum;
    if (!result[location]) {
      // eslint-disable-next-line no-param-reassign
      result[location] = 0;
    }
    // eslint-disable-next-line no-param-reassign
    result[location] += jobDatum.applicants.length;

    return result;
  }, {} as Record<string, number>);

const getFormattedJobsPerLocationObjects =
  (): Array<IBarChartApplicantData> => {
    const initialData = getJobsPerLocationObject();
    return Object.keys(initialData).map((placeOfWork) => ({
      location: placeOfWork,
      AmountOfApplicants: initialData[placeOfWork],
    }));
  };

const getTopSevenApplicantCountWithLocation = (
  formattedJobDataPerLocation: IBarChartApplicantData[]
) => {
  const orderedFormat = formattedJobDataPerLocation.sort((a, b) => {
    return b.AmountOfApplicants - a.AmountOfApplicants;
  });
  const topFilterSize = 7;
  return orderedFormat.slice(0, topFilterSize);
};

const getAverageSalaryPerLocation = (): Record<string, number> => {
  const runningTotals: Record<
    string,
    {
      sumOfSalaries: number;
      numberOfJobs: number;
    }
  > = {};

  jobData.forEach((job) => {
    const { location } = job;
    if (!runningTotals[location]) {
      runningTotals[location] = {
        sumOfSalaries: 0,
        numberOfJobs: 0,
      };
    }

    runningTotals[location].sumOfSalaries += job.salary;
    runningTotals[location].numberOfJobs += 1;
  });

  return Object.keys(runningTotals).reduce((result, location) => {
    const { sumOfSalaries, numberOfJobs } = runningTotals[location];
    // eslint-disable-next-line no-param-reassign
    result[location] = sumOfSalaries / numberOfJobs;

    return result;
  }, {} as Record<string, number>);
};

const getFormattedAverageSalaryPerLocationObjects =
  (): Array<IBarChartAverageSalaryData> => {
    const initialData = getAverageSalaryPerLocation();
    return Object.keys(initialData).map((placeOfWork) => ({
      location: placeOfWork,
      AverageSalary: initialData[placeOfWork],
    }));
  };

const getTopSevenAvarageSalariesWithLocation = (
  formattedSalaryDataPerLocation: IBarChartAverageSalaryData[]
) => {
  const orderedFormat = formattedSalaryDataPerLocation.sort((a, b) => {
    return b.AverageSalary - a.AverageSalary;
  });
  const topFilterSize = 7;
  return orderedFormat.slice(0, topFilterSize);
};

export const ReportingStudio: React.FC = (): React.ReactElement => {
  const dummyLocationData = getFormattedJobsPerLocationObjects();
  const topSevenDummyLocationData =
    getTopSevenApplicantCountWithLocation(dummyLocationData);
  const dummySalaryData = getFormattedAverageSalaryPerLocationObjects();
  const topSevenDummySalaryData =
    getTopSevenAvarageSalariesWithLocation(dummySalaryData);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="initial"
      variants={pageTransitions}
      className="content-container"
    >
      <h1>Reporting Studio</h1>
      <div className="reporting-container">
        <GraphContainer className="graph-container">
          <ReportingStudioLineGraph
            title="Total Applicants"
            description="Total Applicants over the last 7 days"
            data={dummyData}
            dataKeyXAxis="name"
            dataKeyArea="Applicants"
          />
        </GraphContainer>
        <GraphContainer className="graph-container">
          <BarGraph
            title="Top 7 Locations with highest applicants"
            description="Applicant locations in the last 7 days"
            data={topSevenDummyLocationData}
          />
        </GraphContainer>
        <GraphContainer className="graph-container">
          <ReportingStudioLineGraph
            title="Top 7 Highest salary locations"
            description="Calculated top 7 average salaries and their locations over the past week"
            data={topSevenDummySalaryData}
            dataKeyXAxis="location"
            dataKeyArea="AverageSalary"
          />
        </GraphContainer>
        <GraphContainer className="graph-container">
          <ReportingStudioLineGraph
            title="Total Applicants"
            description="Total Applicants over the last 7 days"
            data={dummyData}
            dataKeyXAxis="name"
            dataKeyArea="Applicants"
          />
        </GraphContainer>
      </div>
    </motion.div>
  );
};
