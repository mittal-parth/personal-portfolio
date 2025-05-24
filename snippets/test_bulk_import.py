import unittest
import os
import csv
import tempfile
import shutil
from snippets.bulk_import_from_linkedin import (
    convert_education_csv_to_js,
    convert_projects_csv_to_js,
    convert_volunteering_csv_to_js,
    convert_honors_csv_to_js,
    convert_positions_csv_to_js,
    convert_profile_csv_to_js,
    convert_skills_csv_to_js,
    get_default_paths
)

class TestLinkedInImport(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory for test files
        self.test_dir = tempfile.mkdtemp()
        self.linkedin_export_dir = os.path.join(self.test_dir, 'linkedin-export')
        os.makedirs(self.linkedin_export_dir)
        
        # Create output directory
        self.output_dir = os.path.join(self.test_dir, 'src', 'constants')
        os.makedirs(self.output_dir)
        
        # Store original working directory
        self.original_dir = os.getcwd()
        os.chdir(self.test_dir)

    def tearDown(self):
        # Clean up temporary directory
        os.chdir(self.original_dir)
        shutil.rmtree(self.test_dir)

    def create_test_csv(self, filename, headers, rows):
        """Helper method to create test CSV files"""
        filepath = os.path.join(self.linkedin_export_dir, filename)
        with open(filepath, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(rows)
        return filepath

    def read_output_file(self, output_file=None):
        """Helper method to read the output JS file"""
        if output_file is None:
            output_file = os.path.join(self.output_dir, 'index-example.js')
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as f:
                return f.read()
        return None

    def test_education_conversion(self):
        # Test data
        headers = ['School Name', 'Start Date', 'End Date', 'Notes', 'Degree Name', 'Activities']
        rows = [
            {
                'School Name': 'Test University',
                'Start Date': '2020-01',
                'End Date': '2024-01',
                'Notes': 'Test notes',
                'Degree Name': 'Bachelor of Science',
                'Activities': 'Test activities'
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Education.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_education_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const educationList', output)
        self.assertIn('Test University', output)
        self.assertIn('Bachelor of Science', output)

    def test_projects_conversion(self):
        # Test data with various scenarios
        headers = ['Title', 'Description', 'Url', 'Started On', 'Finished On']
        rows = [
            {
                'Title': 'Project One',
                'Description': 'First project description with "quotes" and special chars: !@#$%^&*()',
                'Url': 'https://github.com/user/project1',
                'Started On': 'Apr 2023',
                'Finished On': 'May 2024'
            },
            {
                'Title': 'Project Two',
                'Description': 'Second project description',
                'Url': 'https://github.com/user/project2',
                'Started On': 'Jan 2023',
                'Finished On': 'Mar 2023'
            },
            {
                'Title': 'Project Three',
                'Description': '',  # Empty description
                'Url': '',  # Empty URL
                'Started On': 'Jun 2023',
                'Finished On': ''  # Empty end date
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Projects.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_projects_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const projects', output)
        
        # Verify project entries
        self.assertIn('Project One', output)
        self.assertIn('Project Two', output)
        self.assertIn('Project Three', output)
        
        # Verify ID generation and incrementing
        self.assertIn('id: "project-1"', output)
        self.assertIn('id: "project-2"', output)
        self.assertIn('id: "project-3"', output)
        
        # Verify tech stack placeholders for each project
        for i in range(1, 4):
            project_section = output[output.find(f'id: "project-{i}"'):output.find(f'id: "project-{i+1}"' if i < 3 else '];')]
            # Verify stack structure
            self.assertIn('stack: [', project_section)
            self.assertIn('id: "icon-1"', project_section)
            self.assertIn('icon: FaRegImage', project_section)
            self.assertIn('name: "Placeholder"', project_section)
        
        # Verify URL handling
        self.assertIn('github: "https://github.com/user/project1"', output)
        self.assertIn('link: "https://github.com/user/project1"', output)
        self.assertIn('github: ""', output)  # Empty URL
        self.assertIn('link: ""', output)    # Empty URL
        
        # Verify description handling
        self.assertIn('content:\n      "First project description with "quotes" and special chars: !@#$%^&*()"', output)
        self.assertIn('content:\n      "Second project description"', output)
        self.assertIn('content:\n      ""', output)  # Empty description
        
        # Verify image placeholder
        self.assertIn('image: placeholder', output)
        
        # Verify project isolation (negative test)
        project_one_section = output[output.find('Project One'):output.find('Project Two')]
        self.assertNotIn('Project Two', project_one_section, "Projects should be properly isolated")
        self.assertNotIn('Project Three', project_one_section, "Projects should be properly isolated")

    def test_volunteering_conversion(self):
        # Test data with various scenarios
        headers = ['Company Name', 'Role', 'Started On', 'Finished On', 'Description']
        rows = [
            {
                'Company Name': 'Non-Profit One',
                'Role': 'Technical Mentor',
                'Started On': 'Apr 2023',
                'Finished On': 'May 2024',
                'Description': 'Mentored junior developers. Conducted code reviews. Led weekly workshops.'
            },
            {
                'Company Name': 'Community Org',
                'Role': 'Open Source Contributor',
                'Started On': 'Jan 2023',
                'Finished On': '',
                'Description': 'Contributed to open source projects. Fixed critical bugs. Improved documentation.'
            },
            {
                'Company Name': 'Tech Education',
                'Role': 'Workshop Instructor',
                'Started On': 'Mar 2022',
                'Finished On': 'Dec 2022',
                'Description': ''  # Empty description
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Volunteering.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_volunteering_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const extraCurricular', output)
        
        # Verify organization and role entries
        self.assertIn('Non-Profit One', output)
        self.assertIn('Community Org', output)
        self.assertIn('Tech Education', output)
        self.assertIn('Technical Mentor', output)
        self.assertIn('Open Source Contributor', output)
        self.assertIn('Workshop Instructor', output)
        
        # Verify ID generation and incrementing
        self.assertIn('id: 1', output)
        self.assertIn('id: 2', output)
        self.assertIn('id: 3', output)
        
        # Verify duration formatting
        self.assertIn('duration: "Apr 2023 - May 2024"', output)
        self.assertIn('duration: "Jan 2023 - Present"', output)
        self.assertIn('duration: "Mar 2022 - Dec 2022"', output)
        
        # Verify content formatting for each entry
        # First entry - multiple sentences
        self.assertIn('text: "Mentored junior developers."', output)
        self.assertIn('text: "Conducted code reviews."', output)
        self.assertIn('text: "Led weekly workshops."', output)
        
        # Second entry - multiple sentences
        self.assertIn('text: "Contributed to open source projects."', output)
        self.assertIn('text: "Fixed critical bugs."', output)
        self.assertIn('text: "Improved documentation."', output)
        
        # Third entry - empty description
        self.assertIn('text: ""', output)
        
        # Verify logo placeholder
        self.assertIn('logo: placeholder', output)
        
        # Verify content structure
        self.assertIn('content: [', output)
        self.assertIn('link: ""', output)  # Verify link field in content items
        
        # Verify entry isolation (negative test)
        non_profit_section = output[output.find('Non-Profit One'):output.find('Community Org')]
        self.assertNotIn('Community Org', non_profit_section, "Entries should be properly isolated")
        self.assertNotIn('Tech Education', non_profit_section, "Entries should be properly isolated")
        
        # Verify content isolation (negative test)
        for org in ['Non-Profit One', 'Community Org', 'Tech Education']:
            org_section = output[output.find(org):output.find('Community Org' if org == 'Non-Profit One' else 'Tech Education' if org == 'Community Org' else '];')]
            # Verify that other organizations' content doesn't appear in this section
            for other_org in ['Non-Profit One', 'Community Org', 'Tech Education']:
                if other_org != org:
                    self.assertNotIn(f'organisation: "{other_org}"', org_section, f"{org} section should not contain content from {other_org}")

    def test_honors_conversion(self):
        # Test data with various description formats
        headers = ['Title', 'Description', 'Issued On']
        rows = [
            {
                'Title': 'Test Award 1',
                'Description': 'First sentence. Second sentence. Third sentence. Fourth sentence.',
                'Issued On': '2023-01'
            },
            {
                'Title': 'Test Award 2',
                'Description': 'Single sentence without period',
                'Issued On': '2023-02'
            },
            {
                'Title': 'Test Award 3',
                'Description': '',  # Empty description
                'Issued On': '2023-03'
            },
            {
                'Title': 'Test Award 4',
                'Description': 'Sentence with "quotes" and special chars: !@#$%^&*()',
                'Issued On': '2023-04'
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Honors.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_honors_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const achievements', output)
        
        # Verify all awards are present
        self.assertIn('Test Award 1', output)
        self.assertIn('Test Award 2', output)
        self.assertIn('Test Award 3', output)
        self.assertIn('Test Award 4', output)
        
        # Verify content field distribution for first award
        self.assertIn('content1: "First sentence."', output)
        self.assertIn('content2: "Second sentence."', output)
        self.assertIn('content3: "Third sentence. Fourth sentence."', output)
        
        # Verify single sentence handling
        self.assertIn('content1: "Single sentence without period"', output)
        self.assertIn('content2: ""', output)
        self.assertIn('content3: ""', output)
        
        # Verify empty description handling
        self.assertIn('content1: ""', output)
        self.assertIn('content2: ""', output)
        self.assertIn('content3: ""', output)
        
        # Verify special character handling - using the actual format from the output
        self.assertIn('content1: "Sentence with "quotes" and special chars: !@#$%^&*()"', output)
        
        # Verify ID generation
        self.assertIn('id: "a-1"', output)
        self.assertIn('id: "a-2"', output)
        self.assertIn('id: "a-3"', output)
        self.assertIn('id: "a-4"', output)
        
        # Verify position (issued_on) field
        self.assertIn('position: "2023-01"', output)
        self.assertIn('position: "2023-02"', output)
        self.assertIn('position: "2023-03"', output)
        self.assertIn('position: "2023-04"', output)
        
        # Verify empty fields
        self.assertIn('article: ""', output)
        self.assertIn('project: ""', output)
        self.assertIn('youtube: ""', output)
        self.assertIn('github: ""', output)

    def test_positions_conversion(self):
        # Test data with various scenarios
        headers = ['Company Name', 'Title', 'Started On', 'Finished On', 'Description']
        rows = [
            # Multiple positions at same company with different date formats
            {
                'Company Name': 'Tech Corp',
                'Title': 'Senior Engineer',
                'Started On': 'Apr 2023',
                'Finished On': 'May 2024',
                'Description': '• Led team of 5 developers\n• Implemented CI/CD pipeline\n• Reduced deployment time by 50%'
            },
            {
                'Company Name': 'Tech Corp',
                'Title': 'Software Engineer',
                'Started On': 'Jan 2022',
                'Finished On': 'Mar 2023',
                'Description': '• Developed new features\n• Fixed critical bugs\n• Improved performance'
            },
            # Present position
            {
                'Company Name': 'Tech Corp',
                'Title': 'Lead Developer',
                'Started On': 'Jun 2024',
                'Finished On': '',
                'Description': '• Leading development team\n• Setting technical direction'
            },
            # Company with sentence-based description
            {
                'Company Name': 'Startup Inc',
                'Title': 'Founder',
                'Started On': 'Mar 2021',
                'Finished On': 'Dec 2023',
                'Description': 'Built the MVP from scratch. Implemented core features. Managed a team of 3 developers.'
            },
            # Present position at another company
            {
                'Company Name': 'Startup Inc',
                'Title': 'Technical Advisor',
                'Started On': 'Jan 2024',
                'Finished On': '',
                'Description': 'Providing technical guidance and mentorship.'
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Positions.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_positions_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const experiences', output)
        
        # Verify organization grouping
        self.assertIn('organisation: "Tech Corp"', output)
        self.assertIn('organisation: "Startup Inc"', output)
        
        # Verify positions within Tech Corp are in correct chronological order
        tech_corp_section = output[output.find('Tech Corp'):output.find('Startup Inc')]
        
        # Check that positions appear in correct order: Lead Developer (Present) -> Senior Engineer -> Software Engineer
        lead_dev_pos = tech_corp_section.find('Lead Developer')
        senior_eng_pos = tech_corp_section.find('Senior Engineer')
        software_eng_pos = tech_corp_section.find('Software Engineer')
        
        self.assertLess(lead_dev_pos, senior_eng_pos, "Present position should appear first")
        self.assertLess(senior_eng_pos, software_eng_pos, "More recent position should appear before older position")
        
        # Verify positions are properly isolated between companies
        # Tech Corp section should not contain Startup Inc positions
        self.assertNotIn('Founder', tech_corp_section, "Tech Corp section should not contain Startup Inc positions")
        self.assertNotIn('Technical Advisor', tech_corp_section, "Tech Corp section should not contain Startup Inc positions")
        
        # Startup Inc section should not contain Tech Corp positions
        startup_section = output[output.find('Startup Inc'):]
        self.assertNotIn('Lead Developer', startup_section, "Startup Inc section should not contain Tech Corp positions")
        self.assertNotIn('Senior Engineer', startup_section, "Startup Inc section should not contain Tech Corp positions")
        self.assertNotIn('Software Engineer', startup_section, "Startup Inc section should not contain Tech Corp positions")
        
        # Verify date formatting
        self.assertIn('duration: "Apr 2023 - May 2024"', output)
        self.assertIn('duration: "Jan 2022 - Mar 2023"', output)
        self.assertIn('duration: "Jun 2024 - Present"', output)
        self.assertIn('duration: "Mar 2021 - Dec 2023"', output)
        self.assertIn('duration: "Jan 2024 - Present"', output)
        
        # Verify content for each position type
        self.assertIn('text: "Led team of 5 developers"', output)
        self.assertIn('text: "Leading development team"', output)
        self.assertIn('text: "Built the MVP from scratch."', output)
        self.assertIn('text: "Providing technical guidance and mentorship."', output)
        
        # Verify organization structure
        self.assertIn('logo: placeholder', output)
        self.assertIn('link: ""', output)
        
        # Verify content array structure
        self.assertIn('content: [', output)
        self.assertIn('link: ""', output)  # Verify link field in content items

    def test_profile_conversion(self):
        # Test data
        headers = ['First Name', 'Last Name', 'Headline']
        rows = [
            {
                'First Name': 'John',
                'Last Name': 'Doe',
                'Headline': 'Software Engineer'
            }
        ]
        
        # Create test CSV
        self.create_test_csv('Profile.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_profile_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const aboutMe', output)
        self.assertIn('John Doe', output)
        self.assertIn('Software Engineer', output)

    def test_skills_conversion(self):
        # Test data with various scenarios
        headers = ['Name']
        rows = [
            # Programming Languages
            {'Name': 'Python (Programming Language)'},
            {'Name': 'JavaScript (Programming Language)'},
            {'Name': 'Java (Programming Language)'},
            
            # Frameworks/Libraries
            {'Name': 'React'},
            {'Name': 'Django'},
            {'Name': 'Tailwind CSS'},
            {'Name': 'TensorFlow'},
            {'Name': 'AngularJS'},
            
            # Tools
            {'Name': 'Git'},
            {'Name': 'Docker'},
            {'Name': 'AWS'},
            {'Name': 'Linux'},
            
            # Edge cases
            {'Name': ''},  # Empty skill
            {'Name': '   '},  # Whitespace only
            {'Name': 'Custom Framework with Spaces'},  # Framework with spaces
            {'Name': 'Special & Characters!'}  # Special characters
        ]
        
        # Create test CSV
        self.create_test_csv('Skills.csv', headers, rows)
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Run conversion with custom paths
        result = convert_skills_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Read output and verify content
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const skills', output)
        
        # Verify category structure
        self.assertIn('title: "Programming Languages"', output)
        self.assertIn('title: "Frameworks/Libraries"', output)
        self.assertIn('title: "Tools"', output)
        
        # Verify programming languages
        pl_section = output[output.find('Programming Languages'):output.find('Frameworks/Libraries')]
        self.assertIn('id: "pl-1"', pl_section)
        self.assertIn('id: "pl-3"', pl_section)
        self.assertIn('icon: SiPython', pl_section)
        self.assertIn('icon: SiJavaScript', pl_section)
        self.assertIn('icon: SiJava', pl_section)
        self.assertIn('name: "Python"', pl_section)
        self.assertIn('name: "JavaScript"', pl_section)
        self.assertIn('name: "Java"', pl_section)
        
        # Verify frameworks
        frameworks_section = output[output.find('Frameworks/Libraries'):output.find('Tools')]
        self.assertIn('id: "f-1"', frameworks_section)
        self.assertIn('id: "f-5"', frameworks_section)
        self.assertIn('icon: SiReact', frameworks_section)
        self.assertIn('icon: SiDjango', frameworks_section)
        self.assertIn('icon: SiTailwindcss', frameworks_section)
        self.assertIn('icon: SiTensorflow', frameworks_section)
        self.assertIn('icon: SiAngularjs', frameworks_section)
        self.assertIn('name: "React"', frameworks_section)
        self.assertIn('name: "Django"', frameworks_section)
        self.assertIn('name: "Tailwind CSS"', frameworks_section)
        self.assertIn('name: "TensorFlow"', frameworks_section)
        self.assertIn('name: "AngularJS"', frameworks_section)
        
        # Verify tools
        tools_section = output[output.find('Tools'):output.find('];')]
        self.assertIn('id: "t-1"', tools_section)
        self.assertIn('id: "t-6"', tools_section)
        self.assertIn('icon: FaRegImage', tools_section)  # All tools use FaRegImage
        self.assertIn('name: "Git"', tools_section)
        self.assertIn('name: "Docker"', tools_section)
        self.assertIn('name: "AWS"', tools_section)
        self.assertIn('name: "Linux"', tools_section)
        self.assertIn('name: "Custom Framework with Spaces"', tools_section)
        self.assertIn('name: "Special & Characters!"', tools_section)
        
        # Verify category isolation (negative test)
        self.assertNotIn('Programming Languages', frameworks_section, "Frameworks section should not contain programming languages")
        self.assertNotIn('Programming Languages', tools_section, "Tools section should not contain programming languages")
        self.assertNotIn('Frameworks/Libraries', pl_section, "Programming languages section should not contain frameworks")
        self.assertNotIn('Frameworks/Libraries', tools_section, "Tools section should not contain frameworks")
        self.assertNotIn('Tools', pl_section, "Programming languages section should not contain tools")
        self.assertNotIn('Tools', frameworks_section, "Frameworks section should not contain tools")
        
        # Verify ID format isolation (negative test)
        self.assertNotIn('pl-', frameworks_section, "Frameworks should not use programming language IDs")
        self.assertNotIn('pl-', tools_section, "Tools should not use programming language IDs")
        self.assertNotIn('f-', pl_section, "Programming languages should not use framework IDs")
        self.assertNotIn('f-', tools_section, "Tools should not use framework IDs")
        self.assertNotIn('t-', pl_section, "Programming languages should not use tool IDs")
        self.assertNotIn('t-', frameworks_section, "Frameworks should not use tool IDs")
        
        # Verify icon format isolation (negative test)
        self.assertNotIn('FaRegImage', pl_section, "Programming languages should not use FaRegImage")
        self.assertNotIn('FaRegImage', frameworks_section, "Frameworks should not use FaRegImage")
        self.assertNotIn('Si', tools_section, "Tools should not use Si icons")

    def test_missing_input_file(self):
        # Test handling of missing input file
        result = convert_education_csv_to_js('/nonexistent/dir')
        self.assertFalse(result)

    def test_empty_csv_file(self):
        # Test handling of empty CSV file
        headers = ['School Name', 'Start Date', 'End Date', 'Notes', 'Degree Name', 'Activities']
        self.create_test_csv('Education.csv', headers, [])
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        result = convert_education_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const educationList', output)
        self.assertIn('[\n\n]', output)

    def test_invalid_csv_format(self):
        # Test handling of invalid CSV format
        input_file = os.path.join(self.linkedin_export_dir, 'Education.csv')
        output_file = os.path.join(self.output_dir, 'test-output.js')
        
        # Create an invalid CSV file with missing headers
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write('invalid,csv,format\n')
        
        # The function should handle this gracefully and return True
        # since it will create an empty list for missing data
        result = convert_education_csv_to_js(self.linkedin_export_dir, output_file)
        self.assertTrue(result)
        
        # Verify that an empty list was created
        output = self.read_output_file(output_file)
        self.assertIsNotNone(output)
        self.assertIn('export const educationList', output)
        self.assertIn('[\n\n]', output)

    def test_default_paths(self):
        # Test that default paths are correctly set
        paths = get_default_paths()
        self.assertIn('input_dir', paths)
        self.assertIn('output', paths)

if __name__ == '__main__':
    unittest.main() 