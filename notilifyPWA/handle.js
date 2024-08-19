const result_holder = document.querySelector('.result_holder');
const formula_holder = document.querySelector('.formula_holder');
const clear_result = document.querySelector('.clear_result');
const backspace = document.querySelector('.backspace');

const preset_page = document.querySelector('.page.presets');
const tools_page = document.querySelector('.page.tools');
const learn_page = document.querySelector('.page.learn');
const preset_holder = preset_page.querySelector('.list_holder');
const tools_holder = tools_page.querySelector('.list_holder');
const learn_holder = learn_page.querySelector('.list_holder');

const preset_calculator = preset_page.querySelector('.page_calculator');
const tools_calculator = preset_page.querySelector('.page_calculator');

const placeholder_preset_header = document.querySelector('.category_title.placeholder');
const placeholder_preset_button = document.querySelector('.category_option.placeholder');
const placeholder_textbox = document.querySelector('.page_calculator_option.placeholder');
const placeholder_toptext = document.querySelector('.top_text.placeholder');
const placeholder_bottomtext = document.querySelector('.bottom_text.placeholder');

const all_back_button = document.querySelectorAll('.back_button');

const calculator_bottom = document.querySelector('.calculator_bottom');
const all_symbol = '789/456*123-.0=+';
const operator = '+-*/';

const operator_image = {
    '+': 'icon/plus.svg',
    '-': 'icon/minus.svg',
    '*': 'icon/multiply.svg',
    '/': 'icon/divide.svg'
}

const preset_info = {
    General: {
        Percentage: 'Calculate the percent of a number',
        'Fraction_To_Decimal': 'From 25/46 to 0.5435',
        Interest: 'Annoying numbers simplified',
    },
    Algebra: {
        Quadratic: 'Weird formula nobody remembers',
    }
}

const tools_info = {
    Science: {
        'Base_to_Scientific': 'From 2563.9 to 2.5639x10^3',
        'Scientific_to_Base': 'From 2.5639x10^3 to 2563.9',
        'Elements': 'Type in the atomic number and get details about the element.'
    },
    English: {
        'MLA_Book_Citations': 'Citations using the MLA format, made for books',
        'MLA_Article_Citations': 'Citations using the MLA format, made for Articles',
        'APA_Article_Citations': 'Citations using the APA format, made for Articles',
    },
    'Computer_Science': {
        'Binary_to_Decimal': 'From 100010101 to 277',
        'Decimal_to_Binary': 'From 277 to 10010101',
        'Decimal_to_Hex': 'From 277 to 511',
        'Hex_to_Decimal': 'From 15C to 348',
    },
    Tools: {
        'Text_to_Phone': 'Turn phone numbers like 1-800-Flowers to 1-800-356-9377',
        'QR_Code_Generator': 'Make QR codes on your pocket',
        'Try_Pill_Pal': 'An app that tracks your medications',
    }
};

const learn_info = {
    Writing: {
        'MLA_Citations': 'Learn how to make citations using the MLA format',
    },
    Math: {
        'Percentages': 'Learn how to get an answer from a percent'
    }
}

const page_calculator_variables = {
    Percentage: {
        top_text: [],
        variables: ['Number', 'Percentage'],
        bottom_text: ['Result: 0.00'],
        run: calculatePercent
    },

    'Fraction_To_Decimal': {
        top_text: [],
        variables: ['Numerator', 'Denominator'],
        bottom_text: ['Result: 0.0000'],
        run: fracToDec
    },

    Interest: {
        top_text: [],
        variables: ['Principal Amount', 'Interest Rate', 'Number of Years'],
        bottom_text: ['Total Interest: $0.00', 'Total Amount: $0.00'],
        run: calculateInterest
    },

    Quadratic: {
        top_text: [],
        variables: ['a', 'b', 'c'],
        bottom_text: ['Solution 1', 'Solution 2'],
        run: calculateQuadratic
    },

    'Base_To_Scientific': {
        top_text: ['Enter a long number'],
        variables: ['Long Number'],
        bottom_text: ['Result:'],
        run: baseToSci,
    },

    'Scientific_To_Base': {
        top_text: ['Enter a number in scientific notation like this:', '1 * 10^15'],
        variables: ['Number'],
        bottom_text: ['Base number:'],
        run: sciToBase,
    },

    Elements: {
        top_text: ['Type in the atomic number of an element'],
        variables: ['Atomic Number'],
        bottom_text: ['Element Name', 'Element Symbol', 'Atomic Mass'],
        run: elementInfo,
    },

    'MLA_Book_Citations': {
        top_text: [],
        variables: ['Author', 'Book', 'Publisher', 'Year'],
        bottom_text: ['MLA Format Citation', '', 'Make sure the title is in italics when you paste it.'],
        run: mlaBookCitation
    },

    'MLA_Article_Citations': {
        top_text: [],
        variables: ['Author', 'Title', 'Publisher', 'Date', 'Link'],
        bottom_text: ['MLA Format Citation', 'Before you publish your work, make sure the publisher is italicized.'],
        run: mlaArticleCitation
    },

    'APA_Article_Citations': {
        top_text: [],
        variables: ['Author', 'Title', 'Year', 'Link'],
        bottom_text: ['APA Format Citation'],
        run: apaArticleCitation
    },

    'Binary_To_Decimal': {
        top_text: [],
        variables: ['Binary'],
        bottom_text: [''],
        run: binaryToDecimal
    },

    'Decimal_To_Binary': {
        top_text: [],
        variables: ['Decimal'],
        bottom_text: [''],
        run: decimalToBinary
    },

    'Decimal_To_Hex': {
        top_text: [],
        variables: ['Decimal'],
        bottom_text: [''],
        run: decimalToHex
    },
    
    'Hex_To_Decimal': {
        top_text: [],
        variables: ['Hex'],
        bottom_text: [''],
        run: hexToDecimal
    },

    'Text_To_Phone': {
        top_text: [],
        variables: ['Phone Number'],
        bottom_text: [''],
        run: textToPhone,
    },

    'QR_Code_Generator': {
        link: 'https://www.kircic.org/qr/gen.html',
    },

    'Try_Pill_Pal': {
        link: 'https://apps.apple.com/us/app/pill-pal-medication-reminder/id6467016800',
    },

    'MLA_Citations': {
        mini_page: 'learn_mla',
    },

    'Percentages': {
        mini_page: 'learn_percent',
    }
}

// calculator functions
function loadCalculatorButtons() {
    for (var i = 0; i < all_symbol.length; i++) {
        let this_symbol = all_symbol[i];
        let new_button = document.createElement('button');
        new_button.classList.add('calculator_button');
        new_button.setAttribute('symbol', this_symbol);
        new_button.onclick = handleButtonClick;
        calculator_bottom.appendChild(new_button);

        let button_image = operator_image[this_symbol];
        if (button_image) {
            new_button.style.setProperty('--image', `url(${button_image})`);
            new_button.classList.add('operator');
        }
    }
}

let calculator_string = '';
function handleButtonClick(event) {
    if (!event.target) { return false };
    let found_symbol = event.target.getAttribute('symbol');
    if (!found_symbol) { return false };
    if (calculator_string.length == 0 && operator.includes(found_symbol)) { return false };
    if (found_symbol == '=') {
        equalHit();
        return false;
    }
    let last_symbol = Array.from(calculator_string).pop();
    if (last_symbol) {
        if (operator.includes(last_symbol) && operator.includes(found_symbol)) {
            backspaceCalculator();
        }
    }
    calculator_string = calculator_string + found_symbol;
    formula_holder.textContent = calculator_string;
    calculate();
}

function calculate() {
    let last_symbol = Array.from(calculator_string).pop();
    if (operator.includes(last_symbol)) { return false };

    let to_calc = calculator_string;
    let calculated; // fix decimal
    if (to_calc.includes('.')) {
        calculated = eval(to_calc).toFixed(2);
    } else {
        calculated = eval(to_calc);
    }

    result_holder.textContent = calculated;
    fitCalculatorText();
    animateResult();
    return calculated;
}

function clearCalculator() {
    calculator_string = '';
    result_holder.textContent = 'Notilify';
    formula_holder.textContent = '';
    animateResult();
    result_holder.style.fontSize = '4rem';
}

function backspaceCalculator() {
    calculator_string = calculator_string.slice(0, -1);
    formula_holder.textContent = calculator_string;
    calculate();
}

function equalHit() {
    let found_calc = calculate();
    calculator_string = found_calc;
    formula_holder.textContent = found_calc;
}

function animateResult() {
    result_holder.classList.add('whoosh');
    setTimeout(function() {
        result_holder.classList.remove('whoosh');
    }, 200)
}

function fitCalculatorText() {
    let result_rect = result_holder.getBoundingClientRect();
    let font_size = parseInt(window.getComputedStyle(result_holder).fontSize);
    if (result_holder.scrollWidth > Math.ceil(result_rect.width)) {
        font_size--;
        result_holder.style.fontSize = font_size + 'px';
        fitCalculatorText();
    }
}

// load presets page
function loadPresets(dict, list) {
    for (var i in dict) {
        let category_clone = placeholder_preset_header.cloneNode(true);
        let category_text = category_clone.querySelector('.category_text');
        category_text.textContent = i.replaceAll('_', ' ');
        category_clone.classList.add(i.toLowerCase());
        category_clone.classList.remove('placeholder');
        list.appendChild(category_clone);

        let category_list = dict[i];
        for (var j in category_list) {
            let option_clone = placeholder_preset_button.cloneNode(true);
            let option_name = option_clone.querySelector('.option_name');
            let option_about = option_clone.querySelector('.option_about');
            option_name.textContent = j.replaceAll('_', ' ');
            option_about.textContent = category_list[j];
            option_clone.classList.remove('placeholder');
            option_clone.classList.add(j.toLowerCase());
            list.appendChild(option_clone);

            option_clone.onclick = loadOption;
        }
    }
}

function loadOption(event) {
    if (!event.target) { return false };
    let class_array = Array.from(event.target.classList);
    let last_class = class_array.pop();
    let matching_info = findMatchingInfo(last_class);
    if (!matching_info) { return false };
    loadPageCalculatorOptions(matching_info, last_class);
}

function findMatchingInfo(last_class) {
    for (var i in page_calculator_variables) {
        let lowercase_key = i.toLowerCase();
        if (lowercase_key == last_class) {
            return page_calculator_variables[i];
        }
    }
}

function loadPageCalculatorOptions(matching_info, last_class) {
    if (!matching_info) { return false }
    if (matching_info.link) { window.open(matching_info.link); return false };
    if (matching_info.mini_page ) { handleMiniPage(matching_info.mini_page); return false };
    let active_page = document.querySelector('.page.active');
    if (!active_page) { return false };
    let found_header = active_page.querySelector('.page_header');
    let back_button = found_header.querySelector('.back_button');
    let found_list_holder = active_page.querySelector('.list_holder');
    let found_page_calc = active_page.querySelector('.page_calculator');
    let found_calc_title = found_page_calc.querySelector('.page_calculator_title');
    let found_calc_button = found_page_calc.querySelector('button');
    
    let word_array = last_class.split('_');
    for (var i = 0; i < word_array.length; i++) {
        word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substr(1);
    }
    found_calc_title.textContent = word_array.join(' ');
    clearPreviousOptions(found_page_calc);

    for (var i = 0; i < matching_info.top_text.length; i++) {
        let this_text = matching_info.top_text[i];
        let text_clone = placeholder_toptext.cloneNode(true);

        text_clone.setAttribute('text_name', this_text);
        text_clone.classList.remove('placeholder');
        found_page_calc.appendChild(text_clone);
    }

    for (var i = 0; i < matching_info.variables.length; i++) {
        let this_variable = matching_info.variables[i];
        let variable_clone = placeholder_textbox.cloneNode(true);
        
        variable_clone.setAttribute('option_name', this_variable);
        variable_clone.classList.remove('placeholder');
        found_page_calc.appendChild(variable_clone);
    }

    for (var i = 0; i < matching_info.bottom_text.length; i++) {
        let this_text = matching_info.bottom_text[i];
        let text_clone = placeholder_bottomtext.cloneNode(true);

        text_clone.setAttribute('text_name', this_text);
        text_clone.classList.remove('placeholder');
        found_page_calc.appendChild(text_clone);
    }

    if (found_page_calc.classList.contains('hidden')) {
        found_page_calc.classList.remove('hidden');
    }
    found_page_calc.classList.add('center');
    found_list_holder.classList.add('hide');
    found_header.classList.add('hide_text');
    back_button.classList.add('show');

    if (matching_info.run) {
        found_calc_button.onclick = matching_info.run;
    }
}

function clearPreviousOptions(page_calc) {
    let all_options = page_calc.querySelectorAll('.page_calculator_option, .top_text, .bottom_text');
    for (var i = 0; i < all_options.length; i++) {
        let this_option = all_options[i];
        this_option.remove();
    }

    let found_calc_button = page_calc.querySelector('button');
    if (found_calc_button) {
        found_calc_button.onclick = null;
    }
}

function handleMiniPage(page_class) {
    let active_page = document.querySelector('.page.active');
    let active_header = active_page.querySelector('.page_header');
    let active_mini = active_page.querySelector('show');
    if (active_mini) {
        active_mini.classList.remove('show');
    }

    let found_mini = active_page.querySelector('.' + page_class);
    found_mini.classList.add('show');
    found_mini.scrollTop = 0;

    let found_back_button = active_page.querySelector('.back_button');
    found_back_button.classList.add('force_pc');
    active_header.classList.add('hide_text');
}

// page calc functions
function calculatePercent() {
    let current_calc = findCurrentCalculator();
    let set_number = parseInt(current_calc.querySelector('[option_name="Number"]').textContent);
    let set_percent = parseInt(current_calc.querySelector('[option_name="Percentage').textContent);
    if (!set_number || !set_percent) { return false };
    let set_text = current_calc.querySelectorAll('.bottom_text')[0];
    set_text.textContent = 'Result: ' + (set_number * (set_percent * 0.01)).toFixed(4);
}

function fracToDec() {
    let current_calc = findCurrentCalculator();
    let set_numerator = parseInt(current_calc.querySelector('[option_name="Numerator"]').textContent);
    let set_denominator = parseInt(current_calc.querySelector('[option_name="Denominator"]').textContent);
    if (!set_numerator || !set_denominator) { return false };
    let set_text = current_calc.querySelectorAll('.bottom_text')[0];
    set_text.textContent = 'Result: ' + (set_numerator / set_denominator).toFixed(4);
}

function calculateInterest() {
    let current_calc = findCurrentCalculator();
    let principal = parseInt(current_calc.querySelector('[option_name="Principal Amount"]').textContent);
    let interest = parseInt(current_calc.querySelector('[option_name="Interest Rate"]').textContent);
    let years = parseInt(current_calc.querySelector('[option_name="Number of Years"]').textContent);
    if (!principal || !interest || !years) { return false };

    let calculated_interest = (principal * interest * years)/100;
    let total_interest = principal + calculated_interest;

    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    let set_total_interest = all_bottom_text[0];
    let set_total_amount = all_bottom_text[1];

    set_total_interest.textContent = 'Total Interest: $'+ calculated_interest.toFixed(2);
    set_total_amount.textContent = 'Total Amount: $' + total_interest.toFixed(2);
}

function calculateQuadratic() {
    let current_calc = findCurrentCalculator();
    let a = parseInt(current_calc.querySelector('[option_name="a"]').textContent);
    let b = parseInt(current_calc.querySelector('[option_name="b"]').textContent);
    let c = parseInt(current_calc.querySelector('[option_name="c"]').textContent);
    if (!a || !b || !c) { return false };
    let roots = calculateQuadraticRoots(a, b, c);
    
    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    let solution_1 = all_bottom_text[0];
    let solution_2 = all_bottom_text[1];

    if (roots.message) {
        solution_1.textContent = roots.message;
        solution_2.textContent = 'N/A';
    } else {
        if (roots.root1) {
            solution_1.textContent = 'Solution 1: ' + (roots.root1).toFixed(4);
        }

        if (roots.root2) {
            solution_2.textContent = 'Solution 2: ' + roots.root2.toFixed(4);
        }
    }
}

function calculateQuadraticRoots(a, b, c) {
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return { root1, root2 };
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        return { root };
    } else {
        return { message: "No real roots" };
    }
}

function baseToSci() {
    let current_calc = findCurrentCalculator();
    let number_box = current_calc.querySelector('[option_name="Long Number"]');
    let found_number = parseInt(number_box.textContent)
    if (!found_number) { return false };
    
    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    all_bottom_text[0].textContent = 'Result: ' + toScientificNotation(found_number);
}

function toScientificNotation(number) {
    if (number === 0) {
        return '0 * 10^0';
    }
    
    const exponent = Math.floor(Math.log10(Math.abs(number)));
    const mantissa = number / Math.pow(10, exponent);
    
    return `${mantissa} * 10^${exponent}`;
}

function sciToBase() {
    let current_calc = findCurrentCalculator();
    let number_box = current_calc.querySelector('[option_name="Number"]');
    let found_number = number_box.textContent;
    if (found_number.length < 1) { return false };

    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    all_bottom_text[0].textContent = 'Base number: ' + fromScientificNotation(found_number);
}

function fromScientificNotation(scientificNotation) {
    const regex = /([\d.]+) \* 10\^([+-]?\d+)/;
    const match = scientificNotation.match(regex);
    
    if (!match) {
        return 'Invalid scientific notation format'
    }

    const mantissa = parseFloat(match[1]);
    const exponent = parseInt(match[2], 10);
    
    return mantissa * Math.pow(10, exponent);
}

function elementInfo() {
    let current_calc = findCurrentCalculator();
    let atomic_box = current_calc.querySelector('[option_name="Atomic Number"]');
    let atomic_number = parseInt(atomic_box.textContent);
    if (!atomic_number) { return false };
    let this_element_info = element_info[atomic_number];
    if (!this_element_info) { return false };

    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    all_bottom_text[0].textContent = 'Element: ' + this_element_info.name;
    all_bottom_text[1].textContent = 'Symbol: ' + this_element_info.short;
    all_bottom_text[2].textContent = 'Atomic Weight: ' + this_element_info.mass
}

function mlaBookCitation() {
    let current_calc = findCurrentCalculator();
    let found_author = current_calc.querySelector('[option_name="Author"]');
    let found_book = current_calc.querySelector('[option_name="Book"]');
    let found_publisher = current_calc.querySelector('[option_name="Publisher"]');
    let found_year = current_calc.querySelector('[option_name="Year"]');

    let formatted = `${found_author.textContent}. ${found_book.textContent}. ${found_publisher.textContent}, ${found_year.textContent}.`
    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    all_bottom_text[1].textContent = formatted;
}

function mlaArticleCitation() {
    let current_calc = findCurrentCalculator();
    let found_author = current_calc.querySelector('[option_name="Author"]');
    let found_title = current_calc.querySelector('[option_name="Title"]');
    let found_publisher = current_calc.querySelector('[option_name="Publisher"]');
    let found_date = current_calc.querySelector('[option_name="Date"]');
    let found_link = current_calc.querySelector('[option_name="Link"]');

    let formatted = `${found_author.textContent}, "${found_title.textContent}." ${found_publisher.textContent}, ${found_date.textContent}. ${found_link.textContent}`;
    let all_bottom_text = current_calc.querySelectorAll('.bottom_text');
    all_bottom_text[0].textContent = formatted;
}

function apaArticleCitation() {
    let current_calc = findCurrentCalculator();
    let found_author = current_calc.querySelector('[option_name="Author"]');
    let found_title = current_calc.querySelector('[option_name="Title"]');
    let found_year = current_calc.querySelector('[option_name="Year"]');
    let found_link = current_calc.querySelector('[option_name="Link"]');

    let formatted = `${found_author.textContent} (${found_title.textContent}). ${found_year.textContent}. ${found_link.textContent}.`;
    let first_bottom_text = current_calc.querySelector('.bottom_text');
    first_bottom_text.textContent = formatted;
}

function binaryToDecimal() {
    let current_calc = findCurrentCalculator();
    let binary_element = current_calc.querySelector('[option_name="Binary"]');
    let found_binary = binary_element.textContent;
    if (found_binary.length < 1) { return false };
    let bottom_text = current_calc.querySelector('.bottom_text');
    bottom_text.textContent = 'Decimal: ' + convertBinaryToDecimal(found_binary);
}

function convertBinaryToDecimal(binary) {
    if (!/^[01]+$/.test(binary)) {
        return "Invalid binary";
    }

    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal = decimal * 2 + parseInt(binary[i], 10);
    }
    return decimal;
}

function decimalToBinary() {
    let current_calc = findCurrentCalculator();
    let decimal_element = current_calc.querySelector('[option_name="Decimal"]');
    let found_decimal = parseInt(decimal_element.textContent);
    if (found_decimal < 1) { return false };
    let bottom_text = current_calc.querySelector('.bottom_text');
    bottom_text.textContent = 'Binary: ' + convertDecimalToBinary(found_decimal);
}

function convertDecimalToBinary(decimal) {
    if (typeof decimal !== 'number' || decimal < 0 || !Number.isInteger(decimal)) {
        return "Invalid decimal";
    }

    if (decimal === 0) {
        return "0";
    }

    let binary = "";
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
}

function decimalToHex() {
    let current_calc = findCurrentCalculator();
    let decimal_element = current_calc.querySelector('[option_name="Decimal"]');
    let found_decimal = parseInt(decimal_element.textContent);
    if (found_decimal < 1) { return false };
    
    let bottom_text = current_calc.querySelector('.bottom_text');
    bottom_text.textContent = 'Converted Hex:' + convertDecimalToHex(found_decimal);
}
// paris was here :3

function convertDecimalToHex(decimal) {
    if (typeof decimal !== 'number' || decimal < 0 || !Number.isInteger(decimal)) {
        return "Invalid decimal";
    }

    if (decimal === 0) {
        return "0";
    }

    const hexDigits = "0123456789ABCDEF";
    let hex = "";

    while (decimal > 0) {
        hex = hexDigits[decimal % 16] + hex;
        decimal = Math.floor(decimal / 16);
    }
    
    return hex;
}

function hexToDecimal() {
    let current_calc = findCurrentCalculator();
    let hex_element = current_calc.querySelector('[option_name="Hex"]');
    let hex = hex_element.textContent;
    if (hex.length < 1) { return false };

    let bottom_text = current_calc.querySelector('.bottom_text');
    bottom_text.textContent = convertHexToDecimal(hex);
}

function convertHexToDecimal(hex) {
    if (typeof hex !== 'string' || !/^[0-9A-Fa-f]+$/.test(hex)) {
        return "Invalid hex";
    }

    let decimal = 0;
    hex = hex.toUpperCase();
    
    for (let i = 0; i < hex.length; i++) {
        const digit = hex[i];
        decimal = decimal * 16 + parseInt(digit, 16);
    }
    
    return decimal;
}

function textToPhone() {
    let current_calc = findCurrentCalculator();
    let phone_element = current_calc.querySelector('[option_name="Phone Number"]');
    let phone_text = phone_element.textContent;
    if (phone_text.length < 1) { return false };
    let bottom_text = current_calc.querySelector('.bottom_text');
    bottom_text.textContent = convertPhoneNumber(phone_text);
}

function convertPhoneNumber(phoneNumber) {
    const charToDigitMap = {
        'A': '2', 'B': '2', 'C': '2',
        'D': '3', 'E': '3', 'F': '3',
        'G': '4', 'H': '4', 'I': '4',
        'J': '5', 'K': '5', 'L': '5',
        'M': '6', 'N': '6', 'O': '6',
        'P': '7', 'Q': '7', 'R': '7', 'S': '7',
        'T': '8', 'U': '8', 'V': '8',
        'W': '9', 'X': '9', 'Y': '9', 'Z': '9'
    };

    let numericPhoneNumber = '';

    for (let char of phoneNumber) {
        const upperChar = char.toUpperCase();
        if (charToDigitMap[upperChar]) {
            numericPhoneNumber += charToDigitMap[upperChar];
        } else {
            numericPhoneNumber += char;
        }
    }

    return numericPhoneNumber;
}

function findCurrentCalculator() {
    let active_page = document.querySelector('.page.active');
    return active_page.querySelector('.page_calculator');
}

// page select functions
const tab_select = document.querySelector('nav.tab_select');
const page_buttons = tab_select.querySelectorAll('button');
const all_pages = document.querySelectorAll('.page');

function assignPageButtons() {
    for (var i = 0; i < page_buttons.length; i++) {
        let this_page = page_buttons[i];
        this_page.onclick = selectPage;
    }
}

function selectPage(event) {
    if (!event.target) { return false };
    let current_active_page = document.querySelector('.page.active');
    let current_active_button = tab_select.querySelector('.selected');
    if (current_active_page) {
        current_active_page.classList.remove('active');
    }
    if (current_active_button) {
        current_active_button.classList.remove('selected');
    }

    let button_class_array = Array.from(event.target.classList);
    let selected_index = button_class_array.indexOf('selected');
    if (selected_index != -1) {
        button_class_array.splice(selected_index, 1);
    }
    let button_class = button_class_array.pop();

    for (var i = 0; i < all_pages.length; i++) {
        let found_page = all_pages[i];
        if (found_page.classList.contains(button_class)) {
            found_page.classList.add('active');
            found_page.scrollTop = 0;
        }
    }

    event.target.classList.add('selected');
}

function loadBackButtons() {
    for (var i = 0; i < all_back_button.length; i++) {
        let this_button = all_back_button[i];
        (function(this_button) {
            this_button.onclick = function() {
                let active_page = document.querySelector('.page.active');
                let found_page_header = active_page.querySelector('.page_header');
                let found_list_holder = active_page.querySelector('.list_holder');
                let found_page_calc = active_page.querySelector('.page_calculator');
                found_page_header.classList.remove('hide_text');
                found_page_calc.classList.remove('center');
                found_page_calc.classList.add('hidden');
                found_list_holder.classList.remove('hide');
                this_button.classList.remove('show');

                if (this_button.classList.contains('force_pc')) {
                    let found_mini_page = active_page.querySelector('.mini_page.show');
                    if (!found_mini_page) { return false };
                    found_mini_page.classList.remove('show');
                    this_button.classList.remove('force_pc');
                }
            }
        })(this_button);
    }
}

// to run
loadCalculatorButtons();
assignPageButtons();
loadBackButtons();
loadPresets(preset_info, preset_holder);
loadPresets(tools_info, tools_holder);
loadPresets(learn_info, learn_holder)
clear_result.addEventListener('mouseup', clearCalculator);
backspace.addEventListener('mouseup', backspaceCalculator);