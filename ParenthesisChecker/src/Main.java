import java.util.Scanner;
import java.util.Stack;

public class Main
{

    public static void main(String[] args)
    {
	    // write your code here
        Scanner scan = new Scanner(System.in);

        /**
         * Test Cases
         * (
         * )
         * ()
         * USER(2): (defun double (x) (* x 2))
         * )USER(2): (defun double (x) (* x 2))
         */

        System.out.println(parenCheck(scan.next()));
    }

    /**
     * This method will determine whether the given String code has properly closed and nested parentheses.
     * @param code
     * @return boolean determining the result of checking for properly closed and nested parentheses.
     */
    public static boolean parenCheck(String code)
    {
        int size = code.length();
        Stack<Character> parens = new Stack<>();

        // if the size is less than 2, we know the parentheses cannot have matching pairs
        if(size < 2)
        {
            return false;
        }

        // iterate over the string and check for '(' and ')'
        for(int i = 0; i < size; i++)
        {
            char ch = code.charAt(i);

            // if we are opening a parenthesis, push it to the stack
            if(ch == '(')
            {
                parens.push('(');
                continue;
            }
            // if we are closing a parenthesis and the stack isn't empty, pop it
            else if(ch == ')' && !parens.empty())
            {
                parens.pop();
                continue;
            }
            // if we are trying to close a parenthesis and the stack is empty, we have found an imbalance. return false
            else if(ch == ')' && parens.empty())
            {
                return false;
            }
        }

        // if we made it this far, it's valid!
        return true;
    }

}
