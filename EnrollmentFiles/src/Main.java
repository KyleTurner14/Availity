import java.io.*;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Main {


    public static void main(String[] args) {
        String path = "file/input.csv"; // Put file path here.
        driver(path);
    }

    /**
     * Helper function for reading CSV, doing sort and removing duplicates logic on enrollees, and exporting into a new CSV file.
     * @param path The file location of the input CSV file
     */
    public static void driver(String path)
    {
        ArrayList<Enrollee> enrollees = new ArrayList<>();
        readCsvFile(path, enrollees);
        sortAndRemoveDuplicateEnrollees(enrollees);
    }

    /**
     * This method will read in a given CSV file of Enrollees
     * @param path The file location of the input CSV file
     * @return enrollees The arraylist that will contain objects relating to enrollees information
     */
    private static void readCsvFile(String path, ArrayList<Enrollee> enrollees)
    {
        String line = "";

        try
        {
            BufferedReader bufferedReader = new BufferedReader(new FileReader("file/input.csv"));

            // read in the line
            while ((line = bufferedReader.readLine()) != null)
            {
                // split the line by each comma
                String[] info = line.split(",");
                // split the name so we can store it as first and last for sorting
                //TODO: Doesn't work for first/last names that have multiple spaces
                String[] name = info[1].split(" ");

                // add it to the arraylist
                Enrollee temp = new Enrollee();
                temp.setUserId(info[0].trim());
                temp.setFirstNm(name[1].trim());
                temp.setLastNm(name[2].trim());
                temp.setVersion(Integer.parseInt(info[2].trim()));
                temp.setInsuranceCompany(info[3].trim());
                enrollees.add(temp);
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * This method will sort and remove the duplicate enrollees
     * @param enrollees The Arraylist containing the enrollees
     */
    private static void sortAndRemoveDuplicateEnrollees(ArrayList<Enrollee>enrollees)
    {
        // sort by insurance, then last name, then first name
        Comparator byInsurance = Comparator.comparing(Enrollee::getInsuranceCompany);
        Comparator byLastNm = Comparator.comparing(Enrollee::getLastNm);
        Comparator byFirstNm = Comparator.comparing(Enrollee::getFirstNm);
        Comparator order = byInsurance.thenComparing(byLastNm).thenComparing(byFirstNm);
        Collections.sort(enrollees, order);

        // now look to remove the duplicates
        Map<String, List<Enrollee>> enrolleeHashMap = enrollees.stream().collect(Collectors.groupingBy(Enrollee::getInsuranceCompany));
        enrolleeHashMap.forEach((key, val) ->
        {
            // remove the duplicates
            removeDuplicates(val);

            // write records to insurance specific csv file
            writeToCsvFile(val, key.replace(" ",""));
        });
    }

    /**
     * This method will remove the duplicates based on userId and version number
     * @param duplicates the list of enrollees containing duplicates
     */
    private static void removeDuplicates(List<Enrollee> duplicates)
    {
        // get map of all userIds to their records by grouping by UserId
        Map<String, List<Enrollee>> duplicatesMap = duplicates.stream().collect(Collectors.groupingBy(Enrollee::getUserId));

        duplicatesMap.values().stream().filter(dup -> dup.size() > 1);

        // if we have duplicates in our map
        if (duplicatesMap.size() > 0)
        {
            // find the max version for each user id and remove the duplicates with a lesser version
            duplicatesMap.forEach((key,val) ->
            {
                int max = findMaxVersion(val);
                Predicate<Enrollee> predicate = enrollee -> enrollee.getUserId().equals(key) && enrollee.getVersion() < max;
                duplicates.removeIf(predicate);
            });
        }
    }

    /**
     * This method will find the max version number of a list of enrollees
     * @param enrollees list of duplicate enrollees
     * @return The max version number
     */
    private static int findMaxVersion(List<Enrollee> enrollees)
    {
        int max = 0;

        // iterate and save max when enrollee > max
        for(Enrollee enrollee : enrollees)
        {
            if(enrollee.getVersion() > max)
            {
                max = enrollee.getVersion();
            }
        }

        return max;
    }

    /**
     * This method will export the final list of enrollees to a new CSV file called output.csv
     * @param enrollees The list containing enrollees objects
     * @param insurance The name of the insurance company
     */
    private static void writeToCsvFile(List<Enrollee> enrollees, String insurance)
    {
        try (PrintWriter writer = new PrintWriter(new File("file/output/output"+"_"+insurance+".csv")))
        {
            for(Enrollee enrollee : enrollees)
            {
                // get the current enrollee information
                ArrayList<String> list = new ArrayList<>();
                list.add(enrollee.getUserId());
                list.add(enrollee.getFirstNm() + " " + enrollee.getLastNm());
                list.add(String.valueOf(enrollee.getVersion()));
                list.add(enrollee.getInsuranceCompany());

                // format the enrollee information
                StringBuilder line = new StringBuilder();
                line.append(list.stream().collect(Collectors.joining(", ")).stripTrailing());
                line.append("\n");

                // write to csv file
                writer.write(line.toString());
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
}
