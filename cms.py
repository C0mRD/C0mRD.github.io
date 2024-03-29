import streamlit as st
import json

# Function to load content from JSON file
def load_content():
    try:
        with open('content.json', 'r') as f:
            content = json.load(f)
    except FileNotFoundError:
        content = {
            "Experience": [],
            "Education": [],
            "Projects": [],
            "Achievements": [],
            "Skills": [],
            "Certifications": []
        }
    return content

# Function to save content to JSON file
def save_content(content):
    with open('content.json', 'w') as f:
        json.dump(content, f, indent=4)

# Main function to manage content
def main():
    st.title("Portfolio CMS")

    content = load_content()

    st.sidebar.header("Manage Content")

    selected_section = st.sidebar.selectbox("Select Section", list(content.keys()))

    if st.sidebar.button("Add Item"):
        new_item = st.text_input(f"Enter {selected_section[:-1]}")
        content[selected_section].append(new_item)
        save_content(content)
        st.sidebar.success("Item added successfully!")

    # Display current content for the selected section
    st.header(selected_section)
    for item in content[selected_section]:
        st.write(item)

    if st.checkbox("Edit/Delete"):
        item_to_edit_delete = st.selectbox("Select Item to Edit/Delete", content[selected_section])
        new_item_name = st.text_input("Enter New Name", value=item_to_edit_delete)
        if st.button("Edit"):
            index = content[selected_section].index(item_to_edit_delete)
            content[selected_section][index] = new_item_name
            save_content(content)
            st.success("Item edited successfully!")
        if st.button("Delete"):
            content[selected_section].remove(item_to_edit_delete)
            save_content(content)
            st.success("Item deleted successfully!")

if __name__ == '__main__':
    main()
