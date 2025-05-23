import os
import csv
import re
import argparse
from datetime import datetime


def get_default_paths():
    """Get default paths for input and output files"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return {
        'input_dir': os.path.join(script_dir, "linkedin-export"),
        'output': os.path.join(script_dir, "..", "src", "constants", "index-example.js")
    }


def parse_date(date_str):
    """Parse date string in format 'MMM YYYY' to datetime object"""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str.strip(), '%b %Y')
    except ValueError:
        return None


def format_date(date_str):
    """Format date string to 'MMM YYYY' format"""
    if not date_str:
        return ""
    try:
        date = parse_date(date_str)
        return date.strftime('%b %Y')
    except (ValueError, TypeError):
        return date_str


def convert_education_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Education.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Read education data from CSV
    education_entries = []
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for i, row in enumerate(reader):
                # Extract data
                school_name = row.get("School Name", "").strip()
                start_date = row.get("Start Date", "").strip()
                end_date = row.get("End Date", "").strip()
                notes = row.get("Notes", "").strip()
                degree_name = row.get("Degree Name", "").strip()
                activities = row.get("Activities", "").strip()

                # Format duration
                duration = ""
                if start_date and end_date:
                    duration = f"{start_date} - {end_date}"
                elif start_date:
                    duration = f"{start_date} - Present"

                # Create entry
                entry = {
                    "id": f"education-{i + 1}",
                    "icon": "FaRegImage",
                    "title": school_name,
                    "degree": degree_name,
                    "duration": duration,
                    "content1": notes,
                    "content2": activities,
                }

                education_entries.append(entry)

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate JS code for education list
    js_entries = []
    for entry in education_entries:
        js_entry = f"""  {{
    id: "{entry["id"]}",
    icon: {entry["icon"]},
    title: "{entry["title"]}",
    degree: "{entry["degree"]}",
    duration: "{entry["duration"]}",
    content1: "{entry["content1"]}",
    content2: "{entry["content2"]}",
  }}"""
        js_entries.append(js_entry)

    js_code = "export const educationList = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if educationList is already defined
            if "export const educationList" in content:
                # Replace existing educationList
                pattern = r"export const educationList = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append educationList to the end
                content += "\n\n" + js_code
        else:
            # Create new file with educationList
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with education data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_projects_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Projects.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Read projects data from CSV
    project_entries = []
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for i, row in enumerate(reader):
                # Extract data
                title = row.get("Title", "").strip()
                description = row.get("Description", "").strip()
                url = row.get("Url", "").strip()
                # started_on = row.get("Started On", "").strip()
                # finished_on = row.get("Finished On", "").strip()

                # Create entry
                entry = {
                    "id": f"project-{i + 1}",
                    "title": title,
                    "github": url,
                    "link": url,
                    "image": "placeholder",
                    "content": description,
                    "stack": [
                        {
                            "id": "icon-1",
                            "icon": "FaRegImage",
                            "name": "Placeholder",
                        }
                    ],
                }

                project_entries.append(entry)

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate JS code for projects list
    js_entries = []
    for entry in project_entries:
        # Format stack items
        stack_items = []
        for stack in entry["stack"]:
            stack_item = f"""      {{
        id: "{stack["id"]}",
        icon: {stack["icon"]},
        name: "{stack["name"]}",
      }}"""
            stack_items.append(stack_item)

        js_entry = f"""  {{
    id: "{entry["id"]}",
    title: "{entry["title"]}",
    github: "{entry["github"]}",
    link: "{entry["link"]}",
    image: {entry["image"]},
    content:
      "{entry["content"]}",
    stack: [
{",\n".join(stack_items)}
    ],
  }}"""
        js_entries.append(js_entry)

    js_code = "export const projects = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if projects is already defined
            if "export const projects" in content:
                # Replace existing projects
                pattern = r"export const projects = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append projects to the end
                content += "\n\n" + js_code
        else:
            # Create new file with projects
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with projects data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_volunteering_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Volunteering.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Read volunteering data from CSV
    volunteering_entries = []
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for i, row in enumerate(reader):
                # Extract data
                company_name = row.get("Company Name", "").strip()
                role = row.get("Role", "").strip()
                started_on = row.get("Started On", "").strip()
                finished_on = row.get("Finished On", "").strip()
                description = row.get("Description", "").strip()

                # Format duration
                duration = ""
                if started_on and finished_on:
                    duration = f"{started_on} - {finished_on}"
                elif started_on:
                    duration = f"{started_on} - Present"

                # Split description by periods to create content items
                content_items = []
                if description:
                    # Split by period but keep the period in the text
                    sentences = [
                        s.strip() + "." for s in description.split(".") if s.strip()
                    ]
                    # Remove the last period if the original text didn't end with a period
                    if not description.endswith(".") and sentences:
                        sentences[-1] = sentences[-1][:-1]

                    for sentence in sentences:
                        if sentence.strip():
                            content_items.append({"text": sentence.strip(), "link": ""})

                # If no content items were created, add an empty one
                if not content_items:
                    content_items.append({"text": "", "link": ""})

                # Create entry
                entry = {
                    "id": i + 1,
                    "organisation": company_name,
                    "title": role,
                    "duration": duration,
                    "content": content_items,
                    "logo": "placeholder",
                }

                volunteering_entries.append(entry)

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate JS code for extraCurricular list
    js_entries = []
    for entry in volunteering_entries:
        # Format content items
        content_items = []
        for content in entry["content"]:
            content_item = f"""      {{
        text: "{content["text"]}",
        link: "{content["link"]}",
      }}"""
            content_items.append(content_item)

        js_entry = f"""  {{
    id: {entry["id"]},
    organisation: "{entry["organisation"]}",
    title: "{entry["title"]}",
    duration: "{entry["duration"]}",
    content: [
{",\n".join(content_items)}
    ],
    logo: {entry["logo"]},
  }}"""
        js_entries.append(js_entry)

    js_code = "export const extraCurricular = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if extraCurricular is already defined
            if "export const extraCurricular" in content:
                # Replace existing extraCurricular
                pattern = r"export const extraCurricular = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append extraCurricular to the end
                content += "\n\n" + js_code
        else:
            # Create new file with extraCurricular
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with volunteering data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_honors_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Honors.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Read honors data from CSV
    honors_entries = []
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for i, row in enumerate(reader):
                # Extract data
                title = row.get("Title", "").strip()
                description = row.get("Description", "").strip()
                issued_on = row.get("Issued On", "").strip()

                # Split description by periods for content fields
                if description:
                    # Split by period but keep the period in the text
                    sentences = [
                        s.strip() + "." for s in description.split(".") if s.strip()
                    ]
                    # Remove the last period if the original text didn't end with a period
                    if not description.endswith(".") and sentences:
                        sentences[-1] = sentences[-1][:-1]

                    # First 2 sentences go to content1 and content2
                    content1 = sentences[0] if len(sentences) > 0 else ""
                    content2 = sentences[1] if len(sentences) > 1 else ""
                    # All remaining sentences go to content3
                    content3 = ""
                    if len(sentences) > 2:
                        content3 = " ".join(sentences[2:])
                else:
                    content1 = ""
                    content2 = ""
                    content3 = ""

                # Create entry
                entry = {
                    "id": f"a-{i + 1}",
                    "icon": "FaRegImage",
                    "event": title,
                    "position": issued_on,
                    "content1": content1,
                    "content2": content2,
                    "content3": content3,
                    "article": "",
                    "project": "",
                    "youtube": "",
                    "github": "",
                }

                honors_entries.append(entry)

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate JS code for achievements list
    js_entries = []
    for entry in honors_entries:
        js_entry = f"""  {{
    id: "{entry["id"]}",
    icon: {entry["icon"]},
    event: "{entry["event"]}",
    position: "{entry["position"]}",
    content1: "{entry["content1"]}",
    content2: "{entry["content2"]}",
    content3: "{entry["content3"]}",
    article: "{entry["article"]}",
    project: "{entry["project"]}",
    youtube: "{entry["youtube"]}",
    github: "{entry["github"]}",
  }}"""
        js_entries.append(js_entry)

    js_code = "export const achievements = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if achievements is already defined
            if "export const achievements" in content:
                # Replace existing achievements
                pattern = r"export const achievements = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append achievements to the end
                content += "\n\n" + js_code
        else:
            # Create new file with achievements
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with honors data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_positions_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Positions.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Read positions data from CSV
    positions_data = []
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                positions_data.append(row)

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Group positions by organization
    organizations = {}
    for position in positions_data:
        company_name = position.get("Company Name", "").strip()

        if company_name not in organizations:
            organizations[company_name] = []

        organizations[company_name].append(position)

    # Process each organization and its positions
    experience_entries = []
    for company_name, positions in organizations.items():
        # Create organization entry
        org_entry = {
            "organisation": company_name,
            "logo": "placeholder",
            "link": "",
            "positions": [],
        }

        # Sort positions by date (most recent first)
        def get_position_date(position):
            started_on = parse_date(position.get("Started On", "").strip())
            finished_on = parse_date(position.get("Finished On", "").strip())
            # If no end date, use a far future date to sort "Present" positions first
            if not finished_on:
                finished_on = datetime(9999, 12, 31)
            return (started_on, finished_on) if started_on else (datetime.min, datetime.min)

        positions.sort(key=get_position_date, reverse=True)

        # Process each position for this organization
        for position in positions:
            title = position.get("Title", "").strip()
            started_on = position.get("Started On", "").strip()
            finished_on = position.get("Finished On", "").strip()
            description = position.get("Description", "").strip()

            # Format duration
            duration = ""
            if started_on and finished_on:
                duration = f"{format_date(started_on)} - {format_date(finished_on)}"
            elif started_on:
                duration = f"{format_date(started_on)} - Present"

            # Split description into content items
            content_items = []

            # Check if description contains bullet points
            if "•" in description:
                # Split by bullet points
                bullet_items = [
                    item.strip() for item in description.split("•") if item.strip()
                ]
                for item in bullet_items:
                    content_items.append({"text": item, "link": ""})
            else:
                # Split by periods
                sentences = [
                    s.strip() + "." for s in description.split(".") if s.strip()
                ]
                # Remove the last period if the original text didn't end with a period
                if not description.endswith(".") and sentences:
                    sentences[-1] = sentences[-1][:-1]

                for sentence in sentences:
                    if sentence.strip():
                        content_items.append({"text": sentence.strip(), "link": ""})

            # If no content items were created, add a default one with the description
            if not content_items and description:
                content_items.append({"text": description, "link": ""})
            elif not content_items:
                content_items.append({"text": "", "link": ""})

            # Create position entry
            position_entry = {
                "title": title,
                "duration": duration,
                "content": content_items,
            }

            org_entry["positions"].append(position_entry)

        experience_entries.append(org_entry)

    # Generate JS code for experiences list
    js_entries = []
    for entry in experience_entries:
        # Format positions
        positions_items = []
        for position in entry["positions"]:
            # Format content items
            content_items = []
            for content in position["content"]:
                content_item = f"""          {{
            text: "{content["text"]}",
            link: "{content["link"]}",
          }}"""
                content_items.append(content_item)

            position_item = f"""      {{
        title: "{position["title"]}",
        duration: "{position["duration"]}",
        content: [
{",\n".join(content_items)}
        ],
      }}"""
            positions_items.append(position_item)

        js_entry = f"""  {{
    organisation: "{entry["organisation"]}",
    logo: {entry["logo"]},
    link: "{entry["link"]}",
    positions: [
{",\n".join(positions_items)}
    ],
  }}"""
        js_entries.append(js_entry)

    js_code = "export const experiences = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if experiences is already defined
            if "export const experiences" in content:
                # Replace existing experiences
                pattern = r"export const experiences = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append experiences to the end
                content += "\n\n" + js_code
        else:
            # Create new file with experiences
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with positions data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_profile_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Profile.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    # Default values
    name = ""
    githubUsername = ""
    tagLine = ""
    intro = "This is a placeholder intro"

    # Read profile data from CSV
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Only process the first row
                first_name = row.get("First Name", "").strip()
                last_name = row.get("Last Name", "").strip()
                headline = row.get("Headline", "").strip()

                # Format full name
                name = f"{first_name} {last_name}".strip()

                # Use headline as tagLine
                tagLine = headline

                # Only process the first row
                break

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate JS code for aboutMe object
    js_code = f"""export const aboutMe = {{
    name: "{name}",
    githubUsername: '{githubUsername}',
    tagLine: "{tagLine}",
    intro: "{intro}"
}};"""

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if aboutMe is already defined
            if "export const aboutMe" in content:
                # Replace existing aboutMe
                pattern = r"export const aboutMe = \{[\s\S]*?\};"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append aboutMe to the end
                content += "\n\n" + js_code
        else:
            # Create new file with aboutMe
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with profile data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def convert_skills_csv_to_js(input_dir=None, output_file=None):
    # Define paths
    if input_dir is None or output_file is None:
        paths = get_default_paths()
        input_dir = input_dir or paths['input_dir']
        output_file = output_file or paths['output']

    input_file = os.path.join(input_dir, "Skills.csv")
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    common_frameworks = ["flask", "django", "react", "angular", "vue", "laravel", "spring", "bootstrap", "tailwind css", "tailwindcss", "express", "dotnet", "tensorflow", "pytorch", "rubyonrails", "rails", "bootstrap", "jquery", "nodejs", "nextjs", "nuxtjs", "angularjs", "vuejs"]

    # Initialize categories
    programming_languages = []
    frameworks = []
    tools = []

    # Read skills data from CSV
    try:
        with open(input_file, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            pl_count = 1  # Counter for programming languages
            f_count = 1   # Counter for frameworks
            t_count = 1   # Counter for tools

            for row in reader:
                skill_name = row.get("Name", "").strip()

                if not skill_name:
                    continue

                # Check if it's a programming language
                if "(Programming Language)" in skill_name:
                    # Extract the language name without the "(Programming Language)" part
                    language_name = skill_name.replace("(Programming Language)", "").strip()
                    # Generate icon name based on language
                    icon_name = f"Si{language_name.replace(' ', '')}"

                    programming_languages.append({
                        "id": f"pl-{pl_count}",
                        "icon": icon_name,
                        "name": language_name
                    })
                    pl_count += 1

                # Check for common frameworks keywords
                elif any(keyword in skill_name.lower() for keyword in common_frameworks):
                    # Use FaRegImage as a placeholder for framework icons
                    frameworks.append({
                        "id": f"f-{f_count}",
                        "icon": f"Si{skill_name.replace(' ', '').capitalize()}",
                        "name": skill_name
                    })
                    f_count += 1

                # Everything else goes to tools
                else:
                    tools.append({
                        "id": f"t-{t_count}",
                        "icon": "FaRegImage",
                        "name": skill_name
                    })
                    t_count += 1

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    # Generate skills categories
    categories = []

    # Add programming languages category if not empty
    if programming_languages:
        categories.append({
            "title": "Programming Languages",
            "items": programming_languages
        })

    # Add frameworks category if not empty
    if frameworks:
        categories.append({
            "title": "Frameworks/Libraries",
            "items": frameworks
        })

    # Add tools category if not empty
    if tools:
        categories.append({
            "title": "Tools",
            "items": tools
        })

    # Generate JS code for skills list
    js_entries = []
    for category in categories:
        # Format items
        items_entries = []
        for item in category["items"]:
            item_entry = f"""      {{
        id: "{item["id"]}",
        icon: {item["icon"]},
        name: "{item["name"]}",
      }}"""
            items_entries.append(item_entry)

        js_entry = f"""  {{
    title: "{category["title"]}",
    items: [
{",\n".join(items_entries)}
    ],
  }}"""
        js_entries.append(js_entry)

    js_code = "export const skills = [\n" + ",\n".join(js_entries) + "\n];\n"

    # Check if output file exists and contains relevant section
    try:
        content = ""
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if skills is already defined
            if "export const skills" in content:
                # Replace existing skills
                pattern = r"export const skills = \[[\s\S]*?\];"
                content = re.sub(pattern, js_code.strip(), content)
            else:
                # Append skills to the end
                content += "\n\n" + js_code
        else:
            # Create new file with skills
            content = js_code

            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write updated content to file
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully updated {output_file} with skills data.")
        return True

    except Exception as e:
        print(f"Error updating JS file: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Convert LinkedIn export CSV files to JS format')
    
    # Add arguments for input directory and output file
    parser.add_argument('--input-dir', help='Directory containing LinkedIn export CSV files')
    parser.add_argument('--output', help='Path to output JS file')
    
    args = parser.parse_args()
    
    # Get default paths
    paths = get_default_paths()
    
    # Convert files with provided or default paths
    convert_education_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_projects_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_volunteering_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_honors_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_positions_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_profile_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])
    convert_skills_csv_to_js(args.input_dir or paths['input_dir'], args.output or paths['output'])


if __name__ == "__main__":
    main()
